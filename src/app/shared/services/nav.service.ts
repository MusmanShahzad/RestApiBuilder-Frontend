import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor() {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	// tslint:disable-next-line: member-ordering
	MENUITEMS: Menu[] = [
		{
			path: '/dashboard', title: 'Dashboard', icon: 'activity', type: 'link', active: true
		},
		{
			title: 'Building', icon: 'github', type: 'sub', badgeType: 'primary', children:
				[
					{
						title: 'Buildings manage', type: 'sub', children: [
							{ path: '/building/manage/add', title: 'Add building', type: 'link' },
							{ path: '/building/manage/my', title: 'View/Edit building', type: 'link' }
						]
					},
					{ path: '/building', title: 'view Buildings', type: 'link' },
				]
		},
		{
			title: 'Apartments', icon: 'github', type: 'sub', badgeType: 'primary', children:
				[
					{
						title: 'Room manage', type: 'sub', children: [
							{ path: '/room/manage/add', title: 'Add Apartments', type: 'link' },
							{ path: '/room/manage/my', title: 'View/Edit Apartments', type: 'link' }
						]
					},
					{title:'Complain',type:'sub', children:[
						{ path: '/complain/add', title: 'Add complain', type: 'link' }
					]
				},
					{ path: '/room', title: 'view Apartments', type: 'link' },
				]
		},
		{
			title: 'Chat', icon: 'users', type: 'link',path: '/chat'
		},
		{
			path: '/raise-support', title: 'Other', icon: 'headphones', type: 'link'
		},
		{
			path: '/documentation', title: 'Other', icon: 'file-text', type: 'link'
		}
	]
	items = new BehaviorSubject<Menu[]>(null);
getMenu(){
	// tslint:disable-next-line: radix
	let type = parseInt(localStorage.getItem('type'));
	if(type){
		//tenant
		if(type==1){
			this.items.next([
				{
					path: '/dashboard', title: 'Dashboard', icon: 'activity', type: 'link', active: true
				},
				{
					title: 'Apartments', icon: 'github', type: 'sub', badgeType: 'primary', children:
						[
							{
								title: 'Room manage', type: 'sub', children: [
									{ path: '/room/manage/my', title: 'My Apartments', type: 'link' }
								]
							},
							{ path: '/room', title: 'view Apartments', type: 'link' },
						]
				},
				{
					title: 'Chat', icon: 'users', type: 'link',path: '/chat'
				}
			]);
		}
		//Owner
		else if(type==2){
				this.items.next([
					{
						path: '/dashboard', title: 'Dashboard', icon: 'activity', type: 'link', active: true
					},
					{
						title: 'Building', icon: 'github', type: 'sub', badgeType: 'primary', children:
							[
								{
									title: 'Buildings manage', type: 'sub', children: [
										{ path: '/building/manage/add', title: 'Add building', type: 'link' },
										{ path: '/building/manage/my', title: 'View/Edit building', type: 'link' }
									]
								},
								{ path: '/building', title: 'view Buildings', type: 'link' },
							]
					},
					{
						title: 'Apartments', icon: 'github', type: 'sub', badgeType: 'primary', children:
							[
								{
									title: 'Room manage', type: 'sub', children: [
										{ path: '/room/manage/my', title: 'View/Edit Apartments', type: 'link' }
									]
								},
								{ path: '/room', title: 'view Apartments', type: 'link' },
							]
					},
					{
						title: 'Chat', icon: 'users', type: 'link',path: '/chat'
					}
				]);
		}
		//agent
	else if(type === 3){ 
		this.items.next([
			{
				path: '/dashboard', title: 'Dashboard', icon: 'activity', type: 'link', active: true
			},
			{
				title: 'Building', icon: 'github', type: 'sub', badgeType: 'primary', children:
					[
						{
							title: 'Buildings manage', type: 'sub', children: [
								{ path: '/building/manage/my', title: 'my building', type: 'link' }
							]
						},
						{ path: '/building', title: 'view Buildings', type: 'link' },
					]
			},
			{
				title: 'Chat', icon: 'users', type: 'link',path: '/chat'
			}
		]);
	}
	}
	
}

}
