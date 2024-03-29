import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';

 import { SocketService } from '../services/socket.service';

import { IonicStorageModule } from '@ionic/storage';

import {
  Welcome, CreateAccount, signin, JoinEvent, ProfileCreation, LoginSuccess, CreateProfile1, CreateProfile2, CreateProfile3, CreateProfile4, CreateProfile5, CreateProfile6, CreateProfile7
} from '../pages/welcome/welcome';

import { People, Person } from '../pages/people/people';
import { Messages, Conversation, NewConversation, NewConversationMessage, Autoresize } from '../pages/messages/messages';
import { UserProfile } from '../pages/userProfile/userProfile';
import { Map } from '../pages/map/map';
import { Settings, Settings_Name, Settings_Phone, Settings_Description, Settings_Interests, Settings_Facebook, Settings_LinkedIn, Settings_Twitter, Settings_Picture, PrivacyPolicy } from '../pages/settings/settings';
import { Saved } from '../pages/saved/saved';
import { Organization, Organizations } from '../pages/organizations/organizations';
import { SavedProfiles } from '../pages/saved/savedProfiles';
import { SavedMessages } from '../pages/saved/savedMessages';
import { EventInfo } from '../pages/eventInfo/eventInfo';
import { Offline } from '../pages/offline/offline';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0d8749d3'
  }
};


@NgModule({
  declarations: [
    MyApp,
    Welcome,
    People,
    Messages,
    Person,
    UserProfile,
    Map,
    Autoresize,
    Settings,
    Saved,
    SavedMessages,
    SavedProfiles,
    Conversation,
    NewConversation,
    NewConversationMessage,
    EventInfo,
    Settings_Name,
    Settings_Phone,
    Settings_Description,
    Settings_Interests,
    Settings_Facebook,
    Settings_LinkedIn,
    Settings_Twitter,
    Settings_Picture,
    PrivacyPolicy,
    CreateAccount,
    CreateProfile1,
    CreateProfile2,
    CreateProfile3,
    CreateProfile4,
    CreateProfile5,
    CreateProfile6,
    CreateProfile7,
    signin,
    JoinEvent,
    Organization,
    Organizations,
    ProfileCreation,
    LoginSuccess,
      Offline
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom'
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Welcome,
    People,
    Messages,
    Person,
    UserProfile,
    Map,
    Settings,
    Conversation,
    NewConversation,
    NewConversationMessage,
    EventInfo,
    Saved,
    SavedMessages,
    SavedProfiles,
    Settings_Name,
    Settings_Phone,
    Settings_Description,
    Settings_Interests,
    Settings_Facebook,
    Settings_LinkedIn,
    Settings_Twitter,
    Settings_Picture,
    CreateProfile1,
    CreateProfile2,
    CreateProfile3,
    CreateProfile4,
    CreateProfile5,
    CreateProfile6,
    CreateProfile7,
    CreateAccount,
    PrivacyPolicy,
    signin,
    JoinEvent,
    Organization,
    Organizations,
    ProfileCreation,
    LoginSuccess,
      Offline
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SocketService]
})
export class AppModule {}
