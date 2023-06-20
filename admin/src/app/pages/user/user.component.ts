import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable, Subscription, debounceTime, distinctUntilChanged} from "rxjs";

import {UserService} from "../../services/user.service";
import {User} from "../../models/User";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
    private regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    private regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    createForm!: FormGroup;
    editForm!: FormGroup;

    allUsers$: Observable<User[]>;
    searchVal: string = '';
    inputForm: FormControl = new FormControl();
    inputSub: Subscription = new Subscription;
    createAdmin: boolean = false;

    updateAdmin: boolean = false;

    noErrorUserName: boolean = true;
    noErrorEmail: boolean = true;
    noErrorPassword: boolean = true;

    constructor(private fb: FormBuilder, private userService: UserService) {
        this.userService.getAllUsers();
        this.allUsers$ = this.userService.allUsers$;
    }

    ngOnInit(): void {
        this.inputSub = this.inputForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(val => {
            this.searchVal = val;
            this.userService.searchUserByName(this.searchVal);
        });

        this.createForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            phoneNumber: [''],
        });

        this.editForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            phoneNumber: [''],
        });
    }

    ngOnDestroy(): void {
        this.inputSub.unsubscribe();
    }

    checkInvalidForm(form: FormGroup, isCreate = true): boolean {
        if (!form.value.username) {
            this.noErrorUserName = false;
            return false;
        } else {
            this.noErrorUserName = true;
        }

        if (!this.regexEmail.test(form.value.email)) {
            this.noErrorEmail = false;
            return false;
        } else {
            this.noErrorEmail = true;
        }

        if (isCreate) {
            if (!this.regexPassword.test(form.value.password)) {
                this.noErrorPassword = false;
                return false;
            } else {
                this.noErrorPassword = true;
            }
        }

        if (form.invalid) {
            return false;
        }

        return true;
    }

    createUser(): void {
        if (this.checkInvalidForm(this.createForm)) {
            this.userService.register(
                this.createForm.value.username.trim(),
                this.createForm.value.email.trim(),
                this.createForm.value.password.trim(),
                this.createForm.value.phoneNumber.trim(),
                this.createAdmin
            ).subscribe(user => document.getElementById('btn-close')?.click())
        }
    }

    onDeleteUser(user: User): void {
        this.userService.deleteUser(user);
    }

    initEditUserForm(user: User): void {
        this.updateAdmin = user.isAdmin;

        this.editForm = this.fb.group({
            username: [user.username, [Validators.required]],
            email: [user.email, [Validators.required, Validators.email]],
            phoneNumber: [user.phoneNumber],
        });
    }

    onUpdateUser(user: User): void {
        if (this.checkInvalidForm(this.editForm, false)) {
            this.userService.updateUser(
                user._id,
                this.editForm.value.username.trim(),
                this.editForm.value.email.trim(),
                this.editForm.value.phoneNumber.trim(),
                this.updateAdmin
            ).subscribe(user => document.getElementById('update-btn-close')?.click())
        }
    }
}
