import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';
import { QuoteRequestService } from '../quote-http/quote-request.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  styles: ['h4 {color: red} ']
})

export class GoalComponent implements OnInit {


  goals!:Goal[];
  alertUser!:AlertService;
  quote!:Quote;

  constructor(goalService:GoalService, alertUser:AlertService, private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals();
    this.alertUser = alertUser;

   }


  ngOnInit() {
    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
  }
  



  toggleDetails(index: number | number){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  deleteGoal(isComplete: any, index: number){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.alertUser.alertMe("the goal has been deleted")
        this.goals.splice(index,1)
      }
    }
  }
  addNewGoal(goal: Goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }




}





  //   goals:Goal[] = [
  //     {id:1, name:'Watch finding Nemo',description:'Find an online version and watch merlin find his son'},
  //     {id:2,name:'Buy Cookies',description:'I have to buy cookies for the parrot'},
  //     {id:3,name:'Get new Phone Case',description:'Diana has her birthday coming up soon'},
  //     {id:4,name:'Get Dog Food',description:'Pupper likes expensive sancks'},
  //     {id:5,name:'Solve math homework',description:'Damn Math'},
  //     {id:6,name:'Plot my world domination plan',description:'Cause I am an evil overlord'},

  // ];


 

