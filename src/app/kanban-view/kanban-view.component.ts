import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.css']
})
export class KanbanViewComponent implements OnInit {

  stages = [{
    id: 1,
    name: 'Backlog',
    cards: [],
  }, {
    id: 2,
    name: 'To Do',
    cards: [],
  }, {
    id: 3,
    name: 'Ongoing',
    cards: [],
  }, {
    id: 4,
    name: 'Done',
    cards: [],
  }];

  newTask;
  index = 0;
  selectedCard;
  selectedCardName;
  canBeDeleted = false;

  constructor() { }

  ngOnInit() {
    console.log(this.stages);
    console.log('canBeDeleted', this.canBeDeleted);
    this.canBeDeleted = false;
    this.selectedCard = { backward: false, forward: false };
  }

  onAddCard() {
    if (this.newTask) {
      this.stages[0].cards.push({ name: this.newTask, id: ++this.index, forward: true, backward: false });
      console.log(this.stages)
      this.newTask = null;
    }
  }

  onCardselect(card) {
    this.selectedCard = card
    this.selectedCardName = card.name;
    this.canBeDeleted = true;
    console.log('onCardselect of kanban view', card)
  }

  onMoveBackCard() {
    for (let i = 0; i < this.stages.length; i++) {
      let stage = this.stages[i];
      for (let j = 0; j < stage.cards.length; j++) {
        if (this.selectedCard.id === stage.cards[j].id) {
          this.canBeDeleted = true;
          let card = stage.cards[j];
          stage.cards.splice(j, 1);
          if (i - 1 === 0) { // if card is in second stage 
            card.backward = false;
          }
          card.forward = true;
          this.stages[i - 1].cards.push(card);
        }
      }
    }
  }

  onMoveForwardCard() {
    for (let i = 0; i < this.stages.length; i++) {
      let stage = this.stages[i];
      for (let j = 0; j < stage.cards.length; j++) {
        if (this.selectedCard.id === stage.cards[j].id) {
          this.canBeDeleted = true;
          let card = stage.cards[j];
          stage.cards.splice(j, 1);
          console.log('card', card)
          console.log(this.stages)
          if (i + 1 === this.stages.length - 1) {  // if card is in 2nd last stage 
            card.forward = false;
          }
          card.backward = true;
          this.stages[i + 1].cards.push(card)
          return;
        }
      }
    }
  }

  onDeleteCard() {
    for (let i = 0; i < this.stages.length; i++) {
      let stage = this.stages[i];
      for (let j = 0; j < stage.cards.length; j++)
        if (this.selectedCard.id === stage.cards[j].id) {
          this.selectedCardName = null;
          let card = stage.cards[j];
          card.forward = false;
          card.backward = false;
          stage.cards.splice(j, 1);
          console.log(this.stages);
          this.canBeDeleted = false;
        }
    }
  }

}
