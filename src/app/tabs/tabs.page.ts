import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmPopupComponent } from '../shared/components/confirm-popup/confirm-popup.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  results: any;
  loaded: boolean = false;
  dataCandidate: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    // this.logoff();
  }

  ngOnInit(): void {
    console.log('fsdg');
    this.getList();
    this.dataCandidate = [
      {
        name: 'Edapadi K Palanisamy',
        party: 'All India Anna Dravida Munnetra Kazhagam',
        img: {
          party:
            'https://bsmedia.business-standard.com/_media/bs/img/topic-profile/profile-images/thumb/464_464/1554902019.png',
          candidate:
            'https://qph.fs.quoracdn.net/main-qimg-b16d1a2792a1a359c0072010b71e8c6e',
        },
      },
      {
        name: 'M.K.Stalin',
        party: 'Dravida Munnetra Kazhagam',
        img: {
          party: 'https://cdn.siasat.com/wp-content/uploads/2020/01/DMK.png',
          candidate:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ZXrp5evYctRq9ga35IOb3RQ72Fm0yhIa923VCfdKk-TLscETeDqLRQXW-OhRijWEyfM&usqp=CAU',
        },
      },
      {
        name: 'Annamalai',
        party: 'Bharathiya Janatha Party',
        img: {
          party:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/1200px-Bharatiya_Janata_Party_logo.svg.png',
          candidate:
            'https://englishtribuneimages.blob.core.windows.net/gallary-content/2020/8/Desk/2020_8$largeimg_1318437419.jpeg',
        },
      },
      {
        name: 'Seeman',
        party: 'Naam Thamizhar Katchi',
        img: {
          party:
            'https://www.naamtamilar.org/wp-content/uploads/2018/12/NTK-Vivasayi-Chinnam-BW-Ganna-Kisan-Sugarcan-Farmer-scaled.jpg',
          candidate:
            'https://www.filmibeat.com/img/popcorn/profile_photos/seeman-3957.jpg',
        },
      },
      {
        name: 'Kamalhaasan',
        party: 'Makkal Neethi Maiyam',
        img: {
          party:
            'data:image/png;base64,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',
          candidate:
            'https://static.toiimg.com/photo/msid-87848101/87848101.jpg',
        },
      },
      {
        name: 'K S Alagiri',
        party: 'All India Congress',
        img: {
          party:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Hand_INC.svg/2305px-Hand_INC.svg.png',
          candidate:
            'https://www.thehindu.com/news/national/tamil-nadu/rvvmp5/article37993142.ece/alternates/LANDSCAPE_615/th19alagiri',
        },
      },
      {
        name: 'Vaiko',
        party: 'Marumalarchi Dravida Munnetra Kazhagam',
        img: {
          party:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH11ghCcFw9XICuRuc5oISCeD6gsYeey2kWmU5rrFJtGb4RgPGuU3i4MD1-ZEwoGCp3sA&usqp=CAU',
          candidate:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSItToQjPmD-RThUkLvw_wPs3ClpmogfECp_3DzjHqha3haP0NuwobGke1nTewLQ4T4lPU&usqp=CAU',
        },
      },
      {
        name: 'Thirumavalavan',
        party: 'Viduthalai Siruthaigal Katchi',
        img: {
          party:
            'https://www.how-to-draw-funny-cartoons.com/images/cartoon-pot-003.jpg',
          candidate:
            'https://nettv4u.com/imagine/06-04-2017/thol-thirumavalavan.jpg',
        },
      },
    ];
  }

  logoff() {
    console.log('oiiopip');
    this.auth.SignOut();
  }

  goToAddUser() {
    this.router.navigate(['add-user']);
  }

  getList() {
    this.http.get('https://randomuser.me/api/?results=9').subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.results = data;
          this.results = this.results.results;
          this.loaded = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  open(i) {
    this.dialog.open(ConfirmPopupComponent, {
      data: i,
    });
  }
}
