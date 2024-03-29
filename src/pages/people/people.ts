import {Component} from '@angular/core';
import {NgStyle} from '@angular/common';

import {HttpService} from '../../services/http.service';
import { SocketService } from '../../services/socket.service';

import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {Conversation} from "../messages/messages";
import {DomSanitizer} from "@angular/platform-browser";

import { Map } from '../map/map';

@Component({
  templateUrl: 'person.html',
  providers: [NgStyle, HttpService, ToastController],

})
export class Person {
  item; saved; image;

  public alertOpen = false;

  constructor(public params: NavParams, public navCtrl: NavController, public api: HttpService, public toast: ToastController, private sanitizer: DomSanitizer, public sockets: SocketService, private alert: AlertController) {
    this.item = params.data.item;
    this.image = {"background-image": "url(" + this.getImage() + ")"}
  }

  getImage(){
    let a;
    if (this.item.picture !== null) {
      a = "url(https://s3.us-east-2.amazonaws.com/airmeet-uploads/pictures/" + this.item.picture + ")";
    }
    else {
      a = "url(assets/profile.gif)"
    }
    return a
  }

  ngOnInit() {
    this.updateSave();
  }

  updateSave() {
    this.api.checkIfSavedProfile(this.item.id).subscribe((res) => {
      this.saved = res.status;
    }, (error) => {
      console.log(error);
    })
  }

  Message(person) {
    console.log(person);
    this.navCtrl.push(Conversation, {
      person: person
    })
  }

  Save(person) {
    this.api.saveProfile(person.id).subscribe((res) => {
      if (res.status === "success") {
        let toast = this.toast.create({
          message: 'Profile has been saved!',
          duration: 3000
        });
        toast.present();
        this.updateSave();
      }
      else console.log(res);
    },
      (err) => {
        console.log(err);
      }
    );
  }

  findOnMap() {

    if(this.sockets.getInitialization()) {

      let markers = this.sockets.getAllMarkers();

      if(markers.indexOf(parseInt(this.item.id)) >= 0) {

        this.sockets.findPersonOnMap(markers.indexOf(this.item.id));

        this.navCtrl.push(Map);

      } else {
        let alert = this.alert.create({
          title: this.item.firstName + ' ' + this.item.lastName + ' is currently not sharing their location.',
          buttons: [{
            text: 'Ok',
            role: 'ok',
            handler: () => {

              this.alertOpen = false;

            }
          }],
          enableBackdropDismiss: false
        });

        alert.present();
      }

    } else {

      this.sockets.getAllLocations((locations) => {

        let hasMatched = false;

        for(let i in locations) {
          if(locations[i].id == this.item.id) {

            this.navCtrl.push(Map, {
              personToFind: this.item.id,
              locations: locations
            });

            hasMatched = true;

            break;
          }
        }

        if(hasMatched === false) {

          let alert = this.alert.create({
            title: this.item.firstName + ' ' + this.item.lastName + ' is currently not sharing their location.',
            buttons: [{
              text: 'Ok',
              role: 'ok',
              handler: () => {

                this.alertOpen = false;

              }
            }],
            enableBackdropDismiss: false
          });

          alert.present();

        }

      });

    }

  }

  unSave(person) {
    this.api.unsaveProfile(person.id).subscribe((res) => {
        if (res.status === "success") {
          let toast = this.toast.create({
            message: 'Profile has been removed!',
            duration: 3000
          });
          toast.present();
          this.updateSave();
        }
        else console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  avatar(img) {
    return "background-image: url(" + img + ")";
  }

}

@Component({templateUrl: "people.html", selector: "people", providers: [HttpService]})
export class People {

  items:any;

  isSearching:boolean;

  element:any;

  private updatePeopleInterval;

  constructor(public nav: NavController, private api: HttpService) {
  }

  ngOnInit() {
    this.getPeople();

    this.updatePeopleInterval = setInterval(() => {
      this.getPeople();
    }, 5000);
  }

  ngOnDestroy() {

    clearInterval(this.updatePeopleInterval);

  }

  search(ev: any) {
    let val = ev.target.value;

    if (val !== "" && val !== undefined) {
      this.isSearching = true;
      this.element = ev.target;

      this.api.searchUsers(val).subscribe(
        (people) => {
          this.items = people.results;
        }, (error) => {
          console.log(error);
        }
      )
    }
    else {
      this.isSearching = false;
      this.getPeople();
    }
  }

  getPeople() {
    this.api.getAllProfiles().subscribe(
      (people) => {
        if (!this.isSearching) {
          this.items = people;
        }
        else {
          if (this.element.val) {
            this.items = people;
          }
        }
      },
      (err) => {
         console.log(err)
      }
    )
  }

  openNavDetailsPage(item) {
    this.nav.push(Person, {item: item});
  }

}
