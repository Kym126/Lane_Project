import { Component, ElementRef, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'image-editor',
  templateUrl: './app/HTML/main.html',
  animations: [
    trigger('transform', [
      state('0', style({
        transform: 'rotate(0deg) translateX(0) scale(1)'
      })),
      state('1', style({
        transform: 'rotate(45deg) translateX(0) scale(1)'
      })),
      state('2', style({
        transform: 'rotate(0deg) translateX(-40px) scale(1)'
      })),
      state('3', style({
        transform: 'rotate(45deg) translateX(-40px) scale(1)'
      })),
      state('4', style({
        transform: 'rotate(0deg) translateX(0) scale(0.5)'
      })),
      state('5', style({
        transform: 'rotate(45deg) translateX(0) scale(0.5)'
      })),
      state('6', style({
        transform: 'rotate(0deg) translateX(-40px) scale(0.5)'
      })),
      state('7', style({
        transform: 'rotate(45deg) translateX(-40px) scale(0.5)'
      })),
      transition('0 => 1', animate('100ms ease-in')),
      transition('1 => 0', animate('100ms ease-out')),
      transition('2 => 3', animate('100ms ease-in')),
      transition('3 => 2', animate('100ms ease-out')),
      transition('4 => 5', animate('100ms ease-in')),
      transition('5 => 4', animate('100ms ease-out')),
      transition('6 => 7', animate('100ms ease-in')),
      transition('7 => 6', animate('100ms ease-out')),
      transition('0 => 2', animate('100ms ease-in')),
      transition('2 => 0', animate('100ms ease-out')),
      transition('1 => 3', animate('100ms ease-in')),
      transition('3 => 1', animate('100ms ease-out')),
      transition('4 => 6', animate('100ms ease-in')),
      transition('6 => 4', animate('100ms ease-out')),
      transition('5 => 7', animate('100ms ease-in')),
      transition('7 => 5', animate('100ms ease-out')),
      transition('0 => 4', animate('100ms ease-in')),
      transition('4 => 0', animate('100ms ease-out')),
      transition('1 => 5', animate('100ms ease-in')),
      transition('5 => 1', animate('100ms ease-out')),
      transition('2 => 6', animate('100ms ease-in')),
      transition('6 => 2', animate('100ms ease-out')),
      transition('3 => 7', animate('100ms ease-in')),
      transition('7 => 3', animate('100ms ease-out'))
    ]),
    trigger('pop', [
      state('pop_in', style({
        transform: 'scale(1)'

      })),
      state('pop_out',   style({
        transform: 'scale(0)'
      })),
      transition('pop_in => pop_out', animate('100ms ease-in')),
      transition('pop_out => pop_in', animate('100ms ease-out'))
    ]),
    trigger('pop', [
      state('pop_in', style({
        transform: 'scale(1)'

      })),
      state('pop_out',   style({
        transform: 'scale(0)'
      })),
      transition('pop_in => pop_out', animate('100ms ease-in')),
      transition('pop_out => pop_in', animate('100ms ease-out'))
    ]),

    trigger('opacity', [
      state('opacity_n', style({
        opacity: '1'
      })),
      state('opacity_y',   style({
        opacity: '.5'
      })),
      transition('opacity_n => opacity_y', animate('100ms ease-in')),
      transition('opacity_y => opacity_n', animate('100ms ease-out'))
    ])
  ]
})

export class AppComponent {

  is_changed = false;
  state: string ='0';
  state_int: any = 0;
  active_index: any = 0;
  opacity: string = 'opacity_n';
  rot_pop: string = 'pop_in';
  trans_pop: string = 'pop_in';
  scale_pop: string = 'pop_in';
  opc_pop: string = 'pop_in';
  actions: string[]= [];
  prev_images_src: any[] = [];
  prev_images_state: string[] = [];
  prev_images_opacity: string[] = [];
  prev_images_actions: string[][] = [];

  constructor(private element: ElementRef) {}

    revert(){
      this.state = '0';
      this.state_int = 0;
      this.opacity = 'opacity_n';
      this.rot_pop = 'pop_in';
      this.trans_pop = 'pop_in';
      this.scale_pop = 'pop_in';
      this.opc_pop = 'pop_in';
      this.actions = new Array<string>();
    }

    get_visibility(){
      if(this.is_changed){
        return "hidden";
      }else{
        return "visible";
      }
    }

    get_visibility_rev(){
      if(!this.is_changed){
        return "hidden";
      }else{
        return "visible";
      }
    }

    toggle_rot(){
      if(this.is_changed){
        this.state_int = parseInt(this.state);
        this.state_int ^= 1;
        this.state = String(this.state_int);

        if(this.rot_pop == "pop_in"){
          this.rot_pop = "pop_out";
        }else{
          this.rot_pop = "pop_in";
        }
        this.actions.push('Rotate');
      }
    }

    toggle_trans(){
      if(this.is_changed){
        this.state_int = parseInt(this.state);
        this.state_int ^= 2;
        this.state = String(this.state_int);

        if(this.trans_pop == "pop_in"){
          this.trans_pop = "pop_out";
        }else{
          this.trans_pop = "pop_in";
        }
        this.actions.push('Translate');
      }
    }

    toggle_scale(){
      if(this.is_changed){
        this.state_int = parseInt(this.state);
        this.state_int ^= 4;
        this.state = String(this.state_int);

        if(this.scale_pop == "pop_in"){
          this.scale_pop = "pop_out";
        }else{
          this.scale_pop = "pop_in";
        }
        this.actions.push('Scale');
      }
    }

    toggle_opc(){
      if(this.is_changed){
        if(this.opacity == "opacity_y"){
          this.opacity = "opacity_n";
        }else{
          this.opacity = "opacity_y";
        }

        if(this.opc_pop == "pop_in"){
          this.opc_pop = "pop_out";
        }else{
          this.opc_pop = "pop_in";
        }
        this.actions.push('Opacity');
      }
    }

    revert_img(){
      this.state_int = parseInt(this.state);
      if(this.actions[this.actions.length-1] == "Rotate"){
        this.rot_pop = "pop_in";
        this.state_int ^= 1;
      }else if(this.actions[this.actions.length-1] == "Translate"){
        this.trans_pop = "pop_in";
        this.state_int ^= 2;
      }else if(this.actions[this.actions.length-1] == "Scale"){
        this.scale_pop = "pop_in";
        this.state_int ^= 4;
      }else{
        this.opc_pop = "pop_in";
        this.opacity = "opacity_n";
      }
      this.state = String(this.state_int);
      this.actions.pop();

      if(this.actions.length != 0){
        var millisecondsToWait = 200;
        var _this = this;
        setTimeout(function() {
            _this.revert_img();
        }, millisecondsToWait);
      }
    }

    actionclick(value:any){
      this.state_int = parseInt(this.state);
      if(value == "Rotate"){
        this.rot_pop = "pop_in";
        this.state_int ^= 1;
      }else if(value == "Translate"){
        this.trans_pop = "pop_in";
        this.state_int ^= 2;
      }else if(value == "Scale"){
        this.scale_pop = "pop_in";
        this.state_int ^= 4;
      }else{
        this.opc_pop = "pop_in";
        this.opacity = "opacity_n";
      }
      this.state = String(this.state_int);
      let index = this.actions.indexOf(value);
      this.actions.splice(index, 1);
    }

    change_image(index: any){
      this.prev_images_opacity[this.active_index] = this.opacity;
      this.prev_images_state[this.active_index] = this.state;
      this.prev_images_actions[this.active_index] = this.actions;
      console.log(this.prev_images_actions[0]);
      this.revert();
      this.active_index = index;
      var image = this.element.nativeElement.querySelector('#active_img');
      image.src = this.prev_images_src[index];
      this.opacity = this.prev_images_opacity[index];
      if(this.prev_images_opacity[index] == "opacity_y"){
        this.opc_pop = "pop_out";
      }else{
        this.opc_pop = "pop_in";
      }
      this.state = this.prev_images_state[index];
      this.state_int = parseInt(this.state);
      if(this.state_int & 1){
        this.rot_pop = "pop_out";
      }else{
        this.rot_pop = "pop_in";
      }

      if(this.state_int & 2){
        this.trans_pop = "pop_out";
      }else{
        this.trans_pop = "pop_in";
      }

      if(this.state_int & 4){
        this.scale_pop = "pop_out";
      }else{
        this.scale_pop = "pop_in";
      }

      for(var j = 0; j < this.prev_images_actions[this.active_index].length; j++){
        this.actions.push(this.prev_images_actions[this.active_index][j]);
      }

    }

    changeListener(event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('#active_img');
        var image_cell = this.element.nativeElement.querySelector('#work_table');
        var actions_made = this.element.nativeElement.querySelector('#actions_made');
        var image_space = this.element.nativeElement.querySelector('#image');
        var slideshow = this.element.nativeElement.querySelector('#slideshow_row');

        if(this.is_changed){
          this.prev_images_state.push(this.state);
          this.prev_images_opacity.push(this.opacity);
          this.prev_images_actions.push(this.actions);
        }

        this.revert();
        image_cell.style.border = '0px';
        actions_made.style.backgroundColor = '#ffffff';
        actions_made.style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
        this.is_changed = true;
        slideshow.style.visibility = "visible";
        var prev_img = this.prev_images_src;
        var _this = this;
        reader.onload = function(e) {
            var src = reader.result;
            prev_img.push(src);
            image.src = src;
            _this.active_index = _this.prev_images_src.length - 1;
        };


        reader.readAsDataURL(event.target.files[0]);
    }
}
