import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Principal} from '../services/auth/principal.service'; //On fait le lien à principal.service pour avoir les fonctions isAdmin, IsUser...
import { NewsService } from '../services/newsService';
import { News } from '../beans/news';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  providers: [NewsService],
})
export class Home implements OnInit {
  message: string = 'Welcome in our shop!!!';
  news: News[] = [];
  newsOfTheDay: News = {};
  nextNews: News = {};

  constructor(private newsService: NewsService, public principal: Principal) {} //On veut pouvoir savoir les permissions de l'utilisateur 

  ngOnInit() {
    this.updateNews();
  }

  updateNews() {
    this.newsService.getNews().subscribe((news: News[]) => {
      this.news = news;
    });

    this.newsService.randomNews().subscribe((news: News) => {
      this.newsOfTheDay = news;
    });
  }

  addLike = (news: News) => {
    this.newsService.addLike(news);
  };

  deleteNews = (news: News) => {
    this.newsService.deleteNews(news).subscribe((response: any) => {
      this.updateNews();
    });
  };

  addNews = () => {
    this.nextNews.likes = 0;
    this.newsService.addNews(this.nextNews).subscribe((response: any) => {
      this.updateNews();
    });
  };
}
