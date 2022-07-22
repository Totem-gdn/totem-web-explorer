import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreLoadingInterceptor } from '../../services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: CoreLoadingInterceptor,
            multi   : true
        }
    ]
})
export class LoadingModule
{
}
