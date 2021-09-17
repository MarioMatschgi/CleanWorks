import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'sc-diagram',
  templateUrl: './sc-diagram.component.html',
  styleUrls: ['./sc-diagram.component.scss'],
})
export class ScDiagramComponent implements OnInit {
  @Input() subjectId: string;

  data;

  options = {
    scales: {
      yAxes: {
        min: 1,
        max: 6,
        reverse: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  constructor(private userData: UserDataService) {}

  ngOnInit(): void {
    this.userData.events.subscribe(this.userData.events.sc, () => {
      const data = {
        labels: [],
        datasets: [
          {
            label: 'Grade',
            data: [],
            borderColor: '#FFA726',
            tension: 0.4,
          },
        ],
      };

      const d = this.userData.grades.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
      for (const grade of d) {
        if (grade.subjectId === this.subjectId) {
          data.labels.push(grade.date.format('DD.MM.YYYY'));
          data.datasets[0].data.push(grade.mark);
        }
      }
      this.data = data;
    });
  }
}
