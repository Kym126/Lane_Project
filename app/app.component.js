"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(element) {
        this.element = element;
        this.is_changed = false;
        this.state = '0';
        this.state_int = 0;
        this.active_index = 0;
        this.opacity = 'opacity_n';
        this.rot_pop = 'pop_in';
        this.trans_pop = 'pop_in';
        this.scale_pop = 'pop_in';
        this.opc_pop = 'pop_in';
        this.actions = [];
        this.prev_images_src = [];
        this.prev_images_state = [];
        this.prev_images_opacity = [];
        this.prev_images_actions = [];
    }
    AppComponent.prototype.revert = function () {
        this.state = '0';
        this.state_int = 0;
        this.opacity = 'opacity_n';
        this.rot_pop = 'pop_in';
        this.trans_pop = 'pop_in';
        this.scale_pop = 'pop_in';
        this.opc_pop = 'pop_in';
        this.actions = new Array();
    };
    AppComponent.prototype.get_visibility = function () {
        if (this.is_changed) {
            return "hidden";
        }
        else {
            return "visible";
        }
    };
    AppComponent.prototype.get_visibility_rev = function () {
        if (!this.is_changed) {
            return "hidden";
        }
        else {
            return "visible";
        }
    };
    AppComponent.prototype.toggle_rot = function () {
        if (this.is_changed) {
            this.state_int = parseInt(this.state);
            this.state_int ^= 1;
            this.state = String(this.state_int);
            if (this.rot_pop == "pop_in") {
                this.rot_pop = "pop_out";
            }
            else {
                this.rot_pop = "pop_in";
            }
            this.actions.push('Rotate');
        }
    };
    AppComponent.prototype.toggle_trans = function () {
        if (this.is_changed) {
            this.state_int = parseInt(this.state);
            this.state_int ^= 2;
            this.state = String(this.state_int);
            if (this.trans_pop == "pop_in") {
                this.trans_pop = "pop_out";
            }
            else {
                this.trans_pop = "pop_in";
            }
            this.actions.push('Translate');
        }
    };
    AppComponent.prototype.toggle_scale = function () {
        if (this.is_changed) {
            this.state_int = parseInt(this.state);
            this.state_int ^= 4;
            this.state = String(this.state_int);
            if (this.scale_pop == "pop_in") {
                this.scale_pop = "pop_out";
            }
            else {
                this.scale_pop = "pop_in";
            }
            this.actions.push('Scale');
        }
    };
    AppComponent.prototype.toggle_opc = function () {
        if (this.is_changed) {
            if (this.opacity == "opacity_y") {
                this.opacity = "opacity_n";
            }
            else {
                this.opacity = "opacity_y";
            }
            if (this.opc_pop == "pop_in") {
                this.opc_pop = "pop_out";
            }
            else {
                this.opc_pop = "pop_in";
            }
            this.actions.push('Opacity');
        }
    };
    AppComponent.prototype.revert_img = function () {
        this.state_int = parseInt(this.state);
        if (this.actions[this.actions.length - 1] == "Rotate") {
            this.rot_pop = "pop_in";
            this.state_int ^= 1;
        }
        else if (this.actions[this.actions.length - 1] == "Translate") {
            this.trans_pop = "pop_in";
            this.state_int ^= 2;
        }
        else if (this.actions[this.actions.length - 1] == "Scale") {
            this.scale_pop = "pop_in";
            this.state_int ^= 4;
        }
        else {
            this.opc_pop = "pop_in";
            this.opacity = "opacity_n";
        }
        this.state = String(this.state_int);
        this.actions.pop();
        if (this.actions.length != 0) {
            var millisecondsToWait = 200;
            var _this = this;
            setTimeout(function () {
                _this.revert_img();
            }, millisecondsToWait);
        }
    };
    AppComponent.prototype.actionclick = function (value) {
        this.state_int = parseInt(this.state);
        if (value == "Rotate") {
            this.rot_pop = "pop_in";
            this.state_int ^= 1;
        }
        else if (value == "Translate") {
            this.trans_pop = "pop_in";
            this.state_int ^= 2;
        }
        else if (value == "Scale") {
            this.scale_pop = "pop_in";
            this.state_int ^= 4;
        }
        else {
            this.opc_pop = "pop_in";
            this.opacity = "opacity_n";
        }
        this.state = String(this.state_int);
        var index = this.actions.indexOf(value);
        this.actions.splice(index, 1);
    };
    AppComponent.prototype.change_image = function (index) {
        this.prev_images_opacity[this.active_index] = this.opacity;
        this.prev_images_state[this.active_index] = this.state;
        this.prev_images_actions[this.active_index] = this.actions;
        console.log(this.prev_images_actions[0]);
        this.revert();
        this.active_index = index;
        var image = this.element.nativeElement.querySelector('#active_img');
        image.src = this.prev_images_src[index];
        this.opacity = this.prev_images_opacity[index];
        if (this.prev_images_opacity[index] == "opacity_y") {
            this.opc_pop = "pop_out";
        }
        else {
            this.opc_pop = "pop_in";
        }
        this.state = this.prev_images_state[index];
        this.state_int = parseInt(this.state);
        if (this.state_int & 1) {
            this.rot_pop = "pop_out";
        }
        else {
            this.rot_pop = "pop_in";
        }
        if (this.state_int & 2) {
            this.trans_pop = "pop_out";
        }
        else {
            this.trans_pop = "pop_in";
        }
        if (this.state_int & 4) {
            this.scale_pop = "pop_out";
        }
        else {
            this.scale_pop = "pop_in";
        }
        for (var j = 0; j < this.prev_images_actions[this.active_index].length; j++) {
            this.actions.push(this.prev_images_actions[this.active_index][j]);
        }
    };
    AppComponent.prototype.changeListener = function (event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('#active_img');
        var image_cell = this.element.nativeElement.querySelector('#work_table');
        var actions_made = this.element.nativeElement.querySelector('#actions_made');
        var image_space = this.element.nativeElement.querySelector('#image');
        var slideshow = this.element.nativeElement.querySelector('#slideshow_row');
        if (this.is_changed) {
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
        reader.onload = function (e) {
            var src = reader.result;
            prev_img.push(src);
            image.src = src;
            _this.active_index = _this.prev_images_src.length - 1;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'image-editor',
            templateUrl: './app/HTML/main.html',
            animations: [
                core_1.trigger('transform', [
                    core_1.state('0', core_1.style({
                        transform: 'rotate(0deg) translateX(0) scale(1)'
                    })),
                    core_1.state('1', core_1.style({
                        transform: 'rotate(45deg) translateX(0) scale(1)'
                    })),
                    core_1.state('2', core_1.style({
                        transform: 'rotate(0deg) translateX(-40px) scale(1)'
                    })),
                    core_1.state('3', core_1.style({
                        transform: 'rotate(45deg) translateX(-40px) scale(1)'
                    })),
                    core_1.state('4', core_1.style({
                        transform: 'rotate(0deg) translateX(0) scale(0.5)'
                    })),
                    core_1.state('5', core_1.style({
                        transform: 'rotate(45deg) translateX(0) scale(0.5)'
                    })),
                    core_1.state('6', core_1.style({
                        transform: 'rotate(0deg) translateX(-40px) scale(0.5)'
                    })),
                    core_1.state('7', core_1.style({
                        transform: 'rotate(45deg) translateX(-40px) scale(0.5)'
                    })),
                    core_1.transition('0 => 1', core_1.animate('100ms ease-in')),
                    core_1.transition('1 => 0', core_1.animate('100ms ease-out')),
                    core_1.transition('2 => 3', core_1.animate('100ms ease-in')),
                    core_1.transition('3 => 2', core_1.animate('100ms ease-out')),
                    core_1.transition('4 => 5', core_1.animate('100ms ease-in')),
                    core_1.transition('5 => 4', core_1.animate('100ms ease-out')),
                    core_1.transition('6 => 7', core_1.animate('100ms ease-in')),
                    core_1.transition('7 => 6', core_1.animate('100ms ease-out')),
                    core_1.transition('0 => 2', core_1.animate('100ms ease-in')),
                    core_1.transition('2 => 0', core_1.animate('100ms ease-out')),
                    core_1.transition('1 => 3', core_1.animate('100ms ease-in')),
                    core_1.transition('3 => 1', core_1.animate('100ms ease-out')),
                    core_1.transition('4 => 6', core_1.animate('100ms ease-in')),
                    core_1.transition('6 => 4', core_1.animate('100ms ease-out')),
                    core_1.transition('5 => 7', core_1.animate('100ms ease-in')),
                    core_1.transition('7 => 5', core_1.animate('100ms ease-out')),
                    core_1.transition('0 => 4', core_1.animate('100ms ease-in')),
                    core_1.transition('4 => 0', core_1.animate('100ms ease-out')),
                    core_1.transition('1 => 5', core_1.animate('100ms ease-in')),
                    core_1.transition('5 => 1', core_1.animate('100ms ease-out')),
                    core_1.transition('2 => 6', core_1.animate('100ms ease-in')),
                    core_1.transition('6 => 2', core_1.animate('100ms ease-out')),
                    core_1.transition('3 => 7', core_1.animate('100ms ease-in')),
                    core_1.transition('7 => 3', core_1.animate('100ms ease-out'))
                ]),
                core_1.trigger('pop', [
                    core_1.state('pop_in', core_1.style({
                        transform: 'scale(1)'
                    })),
                    core_1.state('pop_out', core_1.style({
                        transform: 'scale(0)'
                    })),
                    core_1.transition('pop_in => pop_out', core_1.animate('100ms ease-in')),
                    core_1.transition('pop_out => pop_in', core_1.animate('100ms ease-out'))
                ]),
                core_1.trigger('pop', [
                    core_1.state('pop_in', core_1.style({
                        transform: 'scale(1)'
                    })),
                    core_1.state('pop_out', core_1.style({
                        transform: 'scale(0)'
                    })),
                    core_1.transition('pop_in => pop_out', core_1.animate('100ms ease-in')),
                    core_1.transition('pop_out => pop_in', core_1.animate('100ms ease-out'))
                ]),
                core_1.trigger('opacity', [
                    core_1.state('opacity_n', core_1.style({
                        opacity: '1'
                    })),
                    core_1.state('opacity_y', core_1.style({
                        opacity: '.5'
                    })),
                    core_1.transition('opacity_n => opacity_y', core_1.animate('100ms ease-in')),
                    core_1.transition('opacity_y => opacity_n', core_1.animate('100ms ease-out'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map