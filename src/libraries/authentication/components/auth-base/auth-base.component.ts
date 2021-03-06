import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { RouterService } from 'src/libraries/util/services/router.service';
import { AuthService } from '../../services/auth.service';

/**
 * Base component for login, register, verify email and reset password
 */
@Component({
  selector: 'auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss'],
})
export class AuthBaseComponent implements OnInit {
  /**
   * Type of the authentication
   * - login: Component for logging in
   * - register: Component for registering
   * - verify: Component for verifying email adress
   * - reset: Component for resetting password
   */
  @Input() type: 'login' | 'register' | 'verify' | 'reset';

  /**
   * Data for email
   * - email: Entered email
   * - password: Entered password
   * - confirm_password: Entered confirmation password
   */
  email_data = { email: '', password: '', confirm_password: '' };

  @ViewChild('form_email') form: NgForm;

  /**
   * Constructor
   * @param auth Service for Authentication
   * @param local Service for Localization
   * @param router Service for Routing
   */
  constructor(
    public auth: AuthService,
    public local: LocalizationService,
    public router: RouterService,
    public gv: GlobalVariablesService
  ) {}

  ngOnInit(): void {
    if (this.auth.loggedIn) {
      this.router.nav(this.gv.URLs.home);
      return;
    }
  }

  btn_login() {
    if (this.type === 'login') {
      this.submit_email();
    } else {
      this.router.nav_login();
    }
  }

  btn_register() {
    if (this.type === 'register') {
      this.submit_email();
    } else {
      this.router.nav_register();
    }
  }

  btn_verify() {
    if (this.type === 'verify') {
      this.resend_verification_email();
    }
  }

  btn_reset() {
    if (this.type === 'reset') {
      this.reset_password();
    } else {
      this.router.nav_reset();
    }
  }

  /**
   * Callback for submitting the email-form
   * @param form form
   */
  submit_email(): void {
    this.form.form.markAllAsTouched();

    // IF FORM INVALID RETURN
    if (!this.form.valid) return;

    if (this.type == 'login' || this.type == 'verify') {
      this.auth.signIn_email(this.email_data.email, this.email_data.password);
    } else if (this.type == 'register') {
      this.auth.signUp_email(
        this.email_data.email,
        this.email_data.password,
        this.email_data.confirm_password
      );
    }
  }

  /**
   * Callback for resending verification email
   */
  resend_verification_email(): void {
    this.auth.send_verification_mail().then(() => {
      confirm(this.local.data.lib.auth.verify_email.successfully_sent);
    });
  }

  /**
   * Callback for resetting password
   * @param form form
   */
  reset_password(): void {
    this.form.form.markAllAsTouched();

    // IF FORM INVALID RETURN
    if (!this.form.valid) return;

    this.auth.send_reset_password_email(this.email_data.email).then(() => {
      confirm(this.local.data.lib.auth.reset_password.successfully_sent);
    });
  }
}
