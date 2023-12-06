// Angular Import
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { MortaliteService } from '../services/mortalite.service';
import { NutritionService } from '../services/nutrition.service';
import { RamassageOeufService } from '../services/ramassage-oeuf.service';

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
  totalMoratlites : number;
  totalPoules: number;
  stockAliments : number;
  alimentsConsommes : number;
  nbreTotalOeufRamassage : number;
  nbreOeufPerdu : number;
  nbrOeufVendu : number;
  totalOeufs: number;









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
    private venteService : VenteService,
    private depenseService : DepenseService,
    private mortaliteService : MortaliteService,
    private nutritionService : NutritionService,
    private ramassageService : RamassageOeufService,




  ) {}

  // Life cycle events
  ngOnInit(): void {

    this.countTotalBatiments();
    this.countTotalBandes();
    this.sommeTotaleTresorerie();
    this.sommeTotalVentePoulet();
    this.sommeTotalVenteOeuf();
    this.totalDepense();
    this.calculerBénéfice();
    this.totalMortalite();
    this.totalPouleRestant();
    this.fetcStockAliments();
    this.fetcAlimentsConsommes();
    this.fetcnbreTotalOeufRamassage();
    this.fetcnbrOeufVendu();
    this.fetchtotalOeufs();



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

             

fetcStockAliments() {
  const token = localStorage.getItem('token');

  if (token) {
    const headers = { Authorization: `Bearer ${token}` };

    this.nutritionService.stockAliments(headers).subscribe(
      (data: number) => {
        this.stockAliments = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des stocks d\'aliments:', error);
      }
    );
  }
}

fetcnbrOeufVendu() {
  const token = localStorage.getItem('token');

  if (token) {
    const headers = { Authorization: `Bearer ${token}` };

    this.venteService.nbrOeufVendu(headers).subscribe(
      (data: number) => {
        this.nbrOeufVendu = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des oeufs vendus:', error);
      }
    );
  }
}

fetchtotalOeufs() {
  const token = localStorage.getItem('token');

  if (token) {
    const headers = { Authorization: `Bearer ${token}` };

    this.ramassageService.totalOeufs(headers).subscribe(
      (data: number) => {
        this.totalOeufs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des oeufs totaux:', error);
      }
    );
  }
}

fetcnbreTotalOeufRamassage() {
  const token = localStorage.getItem('token');

  if (token) {
    const headers = { Authorization: `Bearer ${token}` };

    this.ramassageService.nbreTotalOeufRamassage(headers).subscribe(
      (data: number) => {
        this.nbreTotalOeufRamassage = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des oeufs total ramassés:', error);
      }
    );
  }
}

fetcAlimentsConsommes() {
  const token = localStorage.getItem('token');

  if (token) {
    const headers = { Authorization: `Bearer ${token}` };

    this.nutritionService.alimentConsommes(headers).subscribe(
      (data: number) => {
        this.alimentsConsommes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des ventes de poulet:', error);
      }
    );
  }
}


                       //Récupération totale poules
                       totalPouleRestant() {
                        const token = localStorage.getItem('token');
                    
                        if (token) {
                          const headers = { Authorization: `Bearer ${token}` };
                    
                          this.bandeService.totalPouleRestant(headers).subscribe(
                            (data: number) => {
                              this.totalPoules = data;
                            },
                            (error) => {
                              console.error('Erreur lors de la récupération des ventes de poulet:', error);
                            }
                          );
                        }
                      }

                        //Récupération des ventes de Poulets
                        totalMortalite() {
                          const token = localStorage.getItem('token');
                      
                          if (token) {
                            const headers = { Authorization: `Bearer ${token}` };
                      
                            this.mortaliteService.totalMortalite(headers).subscribe(
                              (data: number) => {
                                this.totalMoratlites = data;
                              },
                              (error) => {
                                console.error('Erreur lors de la récupération des effectifs totals de mortalites:', error);
                              }
                            );
                          }
                        }


          //Récupération des ventes de Poulets
          sommeTotalVenteOeuf() {
            const token = localStorage.getItem('token');
        
            if (token) {
              const headers = { Authorization: `Bearer ${token}` };
        
              this.venteService.sommeTotalVenteOeuf(headers).subscribe(
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
      
            this.venteService.sommeTotalVentePoulet(headers).subscribe(
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
