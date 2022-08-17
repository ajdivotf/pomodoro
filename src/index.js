import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap');

const colors = ["#da544f", "#4b9296", "#437da4"];

$("body").css("background-color", colors[0]);

let timer;
let sec, min;
const pomodoro_time = 25;
const short_time = 5;
const long_time = 15;
let count_short_breaks = 0;

function doing_pomodoro() {
  sec = 0;
  min = pomodoro_time;
  $("#pomodoro").addClass("active");
  $("#short").removeClass("active");
  $("#long").removeClass("active");
  $("#start-btn").css("background-color", colors[0]);
  $("#start-btn").css("border", colors[0]);
  $("body").css("background-color", colors[0]);
  $(".active").css("background-color", colors[0]);
  $("#short").css("background-color", "rgba(0, 0, 0, 0)");
  $("#long").css("background-color", "rgba(0, 0, 0, 0)");
  $(".card-title").text("25:00");
  $("#time-to").text("Time to focus!");
  if (timer) {
    timer = clearInterval(timer);
    $("#start-btn").text("START");
  }
}

function doing_short() {
  sec = 0;
  min = short_time;
  $("#pomodoro").removeClass("active");
  $("#short").addClass("active");
  $("#long").removeClass("active");
  $("#start-btn").css("background-color", colors[1]);
  $("#start-btn").css("border", colors[1]);
  $("body").css("background-color", colors[1]);
  $(".active").css("background-color", colors[1]);
  $("#pomodoro").css("background-color", "rgba(0, 0, 0, 0)");
  $("#long").css("background-color", "rgba(0, 0, 0, 0)");
  $(".card-title").text("05:00");
  $("#time-to").text("Time for a break!");
  if (timer) {
    timer = clearInterval(timer);
    $("#start-btn").text("START");
  }
}

function doing_long() {
  sec = 0;
  min = long_time;
  $("#pomodoro").removeClass("active");
  $("#short").removeClass("active");
  $("#long").addClass("active");
  $("#start-btn").css("background-color", colors[2]);
  $("#start-btn").css("border", colors[2]);
  $("body").css("background-color", colors[2]);
  $(".active").css("background-color", colors[2]);
  $("#short").css("background-color", "rgba(0, 0, 0, 0)");
  $("#pomodoro").css("background-color", "rgba(0, 0, 0, 0)");
  $(".card-title").text("15:00");
  $("#time-to").text("Time for a break!");
  if (timer) {
    timer = clearInterval(timer);
    $("#start-btn").text("START");
  }
}

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: pomodoro_time,
      seconds: 0
    };
    this.pomodoro = this.pomodoro.bind(this);
    this.short = this.short.bind(this);
    this.long = this.long.bind(this);
    this.clicker = this.clicker.bind(this);
  }
  clicker() {
    const count_mins = this.state.minutes;
    if (sec === undefined && min === undefined) {
      sec = this.state.seconds;
      min = this.state.minutes;
    }
    if (timer) {
      timer = clearInterval(timer);
      $("#start-btn").text("START");
    } else {
      $("#start-btn").text("STOP");
      timer = setInterval(function () {
        if (min < 0 && sec < 0) {
          clearInterval(timer);
        } else {
          let strTimer =
            Math.trunc(sec / 10) === 0 && Math.trunc(min / 10) === 0
              ? `0${min}:0${sec}`
              : Math.trunc(sec / 10) === 0
              ? `${min}:0${sec}`
              : Math.trunc(min / 10) === 0
              ? `0${min}:${sec}`
              : `${min}:${sec}`;
          $(".card-title").text(strTimer);
        }
        if (sec > 0) --sec;
        else if (min > 0) {
          sec = 59;
          --min;
        } else {
          timer = clearInterval(timer);
          if (count_mins === 5 || count_mins === 15) doing_pomodoro();
          else if (count_short_breaks % 3 !== 0 && count_short_breaks !== 0)
            doing_short();
          else doing_long();
          $("#start-btn").text("START");
        }
      }, 1000);
    }
  }
  pomodoro() {
    this.setState({
      minutes: pomodoro_time,
      seconds: 0
    });
    doing_pomodoro();
  }
  short() {
    this.setState({
      minutes: short_time,
      seconds: 0
    });
    doing_short();
  }
  long() {
    this.setState({
      minutes: long_time,
      seconds: 0
    });
    doing_long();
  }
  render() {
    return (
      <div>
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="true"
                  id="pomodoro"
                  href="/#"
                  onClick={this.pomodoro}
                >
                  Pomodoro
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  aria-current="true"
                  id="short"
                  href="/#"
                  onClick={this.short}
                >
                  Short Break
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  aria-current="true"
                  id="long"
                  href="/#"
                  onClick={this.long}
                >
                  Long Break
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <h1 class="card-title">25:00</h1>
            <a
              href="/#"
              class="btn btn-primary shadow-none"
              id="start-btn"
              onClick={this.clicker}
            >
              START
            </a>
          </div>
        </div>
        <div id="time-to">Time to focus!</div>
      </div>
    );
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById("root"));
