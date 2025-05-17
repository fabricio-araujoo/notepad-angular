import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileStore } from '~/app/shared/stores/profile/profile.store';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-notepad',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './notepad.component.html',
  styleUrl: './notepad.component.scss',
})
export class NotepadComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private profileStore: ProfileStore = inject(ProfileStore);

  async ngOnInit() {
    await this.fetchUser();
  }

  private async fetchUser() {
    const response = await this.userService.getCurrentUser();

    this.profileStore.updateProfile({
      _id: response?.profile?._id || '',
      email: response?.profile?.email || '',
      name: response?.profile?.name || '',
    });
  }
}
