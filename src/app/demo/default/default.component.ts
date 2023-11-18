// Angular Import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// Bootstrap Import
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// third party
import { NgApexchartsModule } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexGrid,
  ApexStroke,
  ApexTooltip
} from 'ng-apexcharts';
import Swal from 'sweetalert2';
import { BatimentService } from '../services/batiment.service';
import { BandeService } from '../services/bande.service';
import { TresorerieService } from '../services/tresorerie.service';
import { VenteService } from '../services/vente.service';
import { DepenseService } from '../services/depense.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  colors: string[];
  grid: ApexGrid;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export default class DefaultComponent {

  totalBatiments: number;
  totalBandes : number;
  soldeTotalTresoreries : number;
  ventePoulets : number;
  venteOeufs : number;
  totalDepenses : number;
  benefice: number;


 






  // private props
  @ViewChild('growthChart') growthChart: ChartComponent;
  chartOptions: Partial<ChartOptions>;
  @ViewChild('bajajchart') bajajchart: ChartComponent;
  chartOptions1: Partial<ChartOptions>;
  monthChart: any;
  yearChart: any;
  colorChart = ['#673ab7'];

  // Constructor
  constructor(
    private batimentService : BatimentService,
    private bandeService : BandeService,
    private tresorerieService : TresorerieService,
    private venteServiceService : VenteService,
    private depenseService : DepenseService



  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Investment',
          data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
        },
        {
          name: 'Loss',
          data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
        },
        {
          name: 'Profit',
          data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
        },
        {
          name: 'Maintenance',
          data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
        }
      ],
      dataLabels: {
        enabled: false
      },
      chart: {
        type: 'bar',
        height: 480,
        stacked: true,
        toolbar: {
          show: true
        }
      },
      colors: ['#90caf9', '#1e88e5', '#673ab7', '#ede7f6'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      grid: {
        strokeDashArray: 4
      },
      tooltip: {
        theme: 'dark'
      }
    };
    this.chartOptions1 = {
      chart: {
        type: 'area',
        height: 95,
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: ['#673ab7'],
      stroke: {
        curve: 'smooth',
        width: 1
      },

      series: [
        {
          data: [0, 15, 10, 50, 30, 40, 25]
        }
      ]
    };
  }

  // Life cycle events
  ngOnInit(): void {
    setTimeout(() => {
      this.monthChart = new ApexCharts(document.querySelector('#tab-chart-1'), this.monthOptions);
      this.monthChart.render();
    }, 500);

    this.countTotalBatiments();
    this.countTotalBandes();
    this.sommeTotaleTresorerie();
    this.sommeTotalVentePoulet();
    this.sommeTotalVenteOeuf();
    this.totalDepense();
    this.calculerBénéfice();


  }

     // Méthode pour calculer le bénéfice
     calculerBénéfice() {
      if (this.soldeTotalTresoreries != null && this.totalDepenses != null) {
        this.benefice = this.soldeTotalTresoreries - this.totalDepenses;
      } else {
        this.benefice = null;
      }
      return this.benefice;
    }

            //Récupération des ventes de Poulets
            totalDepense() {
              const token = localStorage.getItem('token');
          
              if (token) {
                const headers = { Authorization: `Bearer ${token}` };
          
                this.depenseService.totalDepense(headers).subscribe(
                  (data: number) => {
                    this.totalDepenses = data;
                  },
                  (error) => {
                    console.error('Erreur lors de la récupération des ventes de poulet:', error);
                  }
                );
              }
            }


          //Récupération des ventes de Poulets
          sommeTotalVenteOeuf() {
            const token = localStorage.getItem('token');
        
            if (token) {
              const headers = { Authorization: `Bearer ${token}` };
        
              this.venteServiceService.sommeTotalVenteOeuf(headers).subscribe(
                (data: number) => {
                  this.venteOeufs = data;
                },
                (error) => {
                  console.error('Erreur lors de la récupération des ventes de poulet:', error);
                }
              );
            }
          }


        //Récupération des ventes de Poulets
        sommeTotalVentePoulet() {
          const token = localStorage.getItem('token');
      
          if (token) {
            const headers = { Authorization: `Bearer ${token}` };
      
            this.venteServiceService.sommeTotalVentePoulet(headers).subscribe(
              (data: number) => {
                this.ventePoulets = data;
              },
              (error) => {
                console.error('Erreur lors de la récupération des ventes de poulet:', error);
              }
            );
          }
        }

      //Récupération du solde total
      sommeTotaleTresorerie() {
        const token = localStorage.getItem('token');
    
        if (token) {
          const headers = { Authorization: `Bearer ${token}` };
    
          this.tresorerieService.sommeTotaleTresorerie(headers).subscribe(
            (data: number) => {
              this.soldeTotalTresoreries = data;
            },
            (error) => {
              console.error('Erreur lors de la récupération du solde total:', error);
            }
          );
        }
      }

    //Récupération nombre total de Bandes
    countTotalBandes() {
      const token = localStorage.getItem('token');
  
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };
  
        this.bandeService.countTotalBandes(headers).subscribe(
          (data: number) => {
            this.totalBandes = data;
          },
          (error) => {
            console.error('Erreur lors de la récupération du nombre total de batiments:', error);
          }
        );
      }
    }

  //Récupération nombre total de Batiments
  countTotalBatiments() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.batimentService.countTotalBatiments(headers).subscribe(
        (data: number) => {
          this.totalBatiments = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération du nombre total de batiments:', error);
        }
      );
    }
  }

  // public Method
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      setTimeout(() => {
        this.monthChart = new ApexCharts(document.querySelector('#tab-chart-1'), this.monthOptions);
        this.monthChart.render();
      }, 200);
    }

    if (changeEvent.nextId === 2) {
      setTimeout(() => {
        this.yearChart = new ApexCharts(document.querySelector('#tab-chart-2'), this.yearOptions);
        this.yearChart.render();
      }, 200);
    }
  }

  ListGroup = [
    {
      name: 'Bajaj Finery',
      profit: '10% Profit',
      invest: '$1839.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'TTML',
      profit: '10% Loss',
      invest: '$100.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Reliance',
      profit: '10% Profit',
      invest: '$200.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'ATGL',
      profit: '10% Loss',
      invest: '$189.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Stolon',
      profit: '10% Profit',
      invest: '$210.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    }
  ];

  monthOptions = {
    chart: {
      type: 'line',
      height: 90,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#FFF'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    series: [
      {
        name: 'series1',
        data: [45, 66, 41, 89, 25, 44, 9, 54]
      }
    ],
    yaxis: {
      min: 5,
      max: 95
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return 'Total Earning';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  yearOptions = {
    chart: {
      type: 'line',
      height: 90,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#FFF'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    series: [
      {
        name: 'series1',
        data: [35, 44, 9, 54, 45, 66, 41, 69]
      }
    ],
    yaxis: {
      min: 5,
      max: 95
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return 'Total Earning';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
}
