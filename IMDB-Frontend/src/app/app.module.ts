import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

//Importing RoutingComponenet so Normal Componenet automatically imported
import { RoutingComponent } from './app-routing.module';

//import services
import { MovieService } from './services/movie.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
  ],
  providers: [MovieService,AuthService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
