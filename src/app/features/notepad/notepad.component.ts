import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '~/app/core/services/user/user.service';
import { ProfileStore } from '~/app/core/stores/profile/profile.store';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-notepad',
  imports: [RouterOutlet, SidebarComponent],
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
      id: response?.profile?.id || '',
      dateOfBirth: response?.profile?.dateOfBirth || '',
      email: response?.profile?.email || '',
      name: response?.profile?.name || '',
    });
  }
}
