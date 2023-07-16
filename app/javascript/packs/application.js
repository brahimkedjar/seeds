import $ from 'jquery';
import "bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import toastr from 'toastr'
import '../css/Button.css';
import '../css/Cards.css';
import '../css/Error.css';
import '../css/NavBarAcount.css'
import '../css/SearchBar.css'
import '../css/Appointments.module.css';
import '../css/Docmod.css'
import '../css/Doctor.module.css';
import '../css/FindDoctor.css';
import '../css/Home.css';
import '../css/PatientList.module.css';
import "../css/map.css";
import '../css/SearchDoctors.module.css';

import './index.css';
window.jQuery = $;
window.$ = $;

require('turbolinks').start()
require('@rails/activestorage').start()

toastr.options = {
  closeButton: false,
  debug: false,
  positionClass: "toast-top-right",
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

global.toastr = toastr
