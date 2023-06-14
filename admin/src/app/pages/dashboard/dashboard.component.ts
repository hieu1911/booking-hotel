import { Component, ViewChild } from '@angular/core';
import { Observable } from "rxjs";
import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ChartComponent,
    ApexAxisChartSeries,
    ApexDataLabels,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexXAxis,
    ApexFill,
    ApexTooltip
} from 'ng-apexcharts';

import { UserService } from "../../services/user.service";
import { HotelService } from "../../services/hotel.service";
import { RoomService } from "../../services/room.service";
import { ReservationService } from "../../services/reservation.service";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
};

export type HotelChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
    @ViewChild("chart") chart!: ChartComponent;
    public chartOptions!: Partial<ChartOptions> | any;
    public hotelChartOptions!: Partial<HotelChartOptions> | any;
    countUsers: Number = 0;
    countHotels: Number = 0;
    countRooms: Number = 0;
    countResevations: Number = 0;
    totalRevenue: number = 0;
    categories: string[] =  [
        "Da Lat",
        "HCM City",
        "Nha Trang",
        "Da Nang",
        "Hoi An",
        "Cam Ranh",
        "Vung Tau"
    ];
    
    dataChats: number[] = [];
    
    constructor(
        private userServices: UserService,
        private hotelServices: HotelService,
        private roomServices: RoomService,
        private reservationServices: ReservationService
        ) {
        this.hotelServices.getCountHotelInCities(this.categories);
        this.hotelServices.countHotelInCities$.subscribe(r => {
            this.dataChats = r;
            console.log(this.dataChats)
            this.hotelChartOptions = {
                ...this.hotelChartOptions,
                series: [
                    {
                        name: "Number hotels",
                        data: this.dataChats
                    }
                ]
            }
        });
        
        this.chartOptions = {
            series: [60],
            chart: {
                height: 260,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "70%"
                    }
                }
            },
            labels: ["Increase"]
        };
        
        this.hotelChartOptions = {
            series: [
                {
                    name: "Number hotels",
                    data: this.dataChats
                }
            ],
            chart: {
                type: "bar",
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "35%",
                    endingShape: "rounded"
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"]
            },
            xaxis: {
                categories: this.categories
            },
            yaxis: {
                title: {
                    
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function(val: any) {
                        return val;
                    }
                }
            }
        }
        
        this.userServices.countUsers$.subscribe(count => this.countUsers = count);
        this.hotelServices.countHotels$.subscribe(count => this.countHotels = count);
        this.roomServices.countRooms$.subscribe(count => this.countRooms = count);
        this.reservationServices.countReservations$.subscribe(count => this.countResevations = count);
        this.roomServices.totalRevenue$.subscribe(total => this.totalRevenue = total);
    }

}
