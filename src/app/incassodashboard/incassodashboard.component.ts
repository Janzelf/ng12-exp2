
import { Component, OnInit, ViewEncapsulation, OnDestroy, OnChanges, Input } from '@angular/core';
import { ConnectTaService } from './connect-ta.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';


@Component({
  selector: 'app-incassodashboard',
  templateUrl: './incassodashboard.component.html',
  styleUrls: ['./incassodashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IncassoDashboardComponent implements OnInit, OnDestroy {
  toernooinaam = 'Niet opgestart vanuit de ToernooiAssistent!';
  incassoform: FormGroup;
  submitted = false;
//  validateX: Function;
  @Input() isProef = true;
  formvorm = {
    gegevens: this.fb.group({
    incassant: ['', Validators.required],
    rekeningnr: ['', {validators: [ Validators.required,
      Validators.pattern(/^NL\d\d[A-Z]{4}[0-9]{10}$/i)],
      asyncValidators: this.connectHost.validateIban()
      }],
    incid: ['', [Validators.required, Validators.pattern(/^NL\d\dZZZ[0-9]{12}$/i)] ],
    pemail: ['', [Validators.required, Validators.email ]],
    herhaalbaar: ['']
    }),
    proefgegevens: this.fb.group({
      proefaccount :  [''],
      rekeningnrt: ['', {updateOn : 'blur', validators: [Validators.required,
          Validators.pattern(/^NL\d\d[A-Z]{4}[0-9]{10}$/i)],
          asyncValidators: [this.connectHost.validateIban()]}],
    })
  };
  fname = '';
  isResultaat = false;
  fout = '';
  aantalTransacties = 0;
  totaalbedrag = 0;
    gegevens = {
      incassant: '',
      rekeningnr: '',
      incid : '',
      pemail : '' ,
      herhaalbaar : false};
    proefgegevens = {
      proefaccount : '',
      rekeningnrt : '',
    };

  constructor(private fb: FormBuilder, protected localStorage: LocalStorage,
    private connectHost: ConnectTaService ) {
      this.incassoform = this.fb.group(this.formvorm);
    }

  ngOnInit() {
    this.localStorage.getItem<IncassoDashboardComponent['gegevens']>('gegevens').subscribe(gegevens1 => {
      if (gegevens1) {
        this.gegevens = <any>gegevens1;
        this.formvorm.gegevens.setValue(<any>gegevens1);
      }
    });
    this.localStorage.getItem<IncassoDashboardComponent['proefgegevens']>('proefgegevens').subscribe(proefgegevens1 => {
      if (proefgegevens1) {
        this.proefgegevens = <any>proefgegevens1;
        this.formvorm.proefgegevens.setValue(<any>proefgegevens1);
      }
    });
    this.connectHost.getParms()
      .subscribe(data => {
        if (data) {
          if (data['toernooinaam']) { this.toernooinaam = data['toernooinaam']; }
          if (data['fname']) {this.fname = data['fname']; }
          if (data['aantal']) {this.aantalTransacties = data['aantal']; }
          if (data['totaal']) {this.totaalbedrag = data['totaal']; }
        }
      });
  }
  ngOnDestroy() {}
  onSubmit()  {
    this.submitted = true;
    this.incassoform.value.gegevens.rekeningnr = this.incassoform.value.gegevens.rekeningnr.toUpperCase();
    this.incassoform.value.gegevens.incid = this.incassoform.value.gegevens.incid.toUpperCase();
    this.incassoform.value.proefgegevens.rekeningnrt = this.incassoform.value.proefgegevens.rekeningnrt.toUpperCase();
    this.localStorage.setItem('gegevens', this.incassoform.value.gegevens).subscribe();
    console.log(this.incassoform.value.gegevens);
    this.localStorage.setItem('proefgegevens', this.incassoform.value.proefgegevens).subscribe();
    console.log(this.incassoform.value.proefgegevens);
    this.gegevens = this.incassoform.value.gegevens; // voor de localstorage
    this.proefgegevens = this.incassoform.value.proefgegevens; // voor de localstorage
    this.connectHost.submitHost(this.isProef, JSON.stringify(this.gegevens), JSON.stringify(this.proefgegevens))
      .subscribe((data) => {
        if (data['result']) {
          this.isResultaat = true;
          this.fout = '';
          console.log(data['result']);
        }
      }
    );
  }

}
