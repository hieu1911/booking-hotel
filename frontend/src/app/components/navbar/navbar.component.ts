import { Component, OnInit, Input } from '@angular/core';
import { faCircleQuestion, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import * as $ from 'jquery';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {
  @Input() auth: boolean = false;
  
  faCircleQuestion = faCircleQuestion;
  faRectangleList = faRectangleList; 

  ngOnInit(): void {
    const tooltipTriggerList = $('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

}
