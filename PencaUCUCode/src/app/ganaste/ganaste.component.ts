import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ganaste',
  templateUrl: './ganaste.component.html',
  styleUrl: './ganaste.component.css'
})
export class GanasteComponent implements OnInit {
  ngOnInit(): void {
    this.showSweetAlert();
  }
  
  showSweetAlert(): void {
    Swal.fire({
      title: "Acertaste en tu predicción",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }

}
