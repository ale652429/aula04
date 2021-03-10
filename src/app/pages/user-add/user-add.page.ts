import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { UserServiceService } from '../../services/user-service.service';
import { MgService } from '../../services/mg.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})

export class UserAddPage implements OnInit {

  user: User = new User();
key:string=null;

  constructor(
    private storage: Storage,
    // public alertController: AlertController,
    private userService: UserServiceService,   
    // public toastController: ToastController,
    protected msg:MgService,
    private router:Router,
    private activadeRouter:ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.activadeRouter.snapshot.paramMap.get('key');
    if (this.key){
      this.userService.get(this.key).subscribe(
        res=>{
          this.user = res
        
        },
        erro=>{
          console.log("Erro:", erro);
          
        }
        
      )
    }
  }

  buscaCEP() {
      this.userService.pegaCEP(this.user.cep).subscribe(
        res => {
          console.log(res);
          if (res.erro) {
            this.msg.presentToast("CEP não localizado!");
          } else {
            //this.user = res;
            //this.user.cep = res.cep;
            this.user.logradouro = res.logradouro;
            this.user.localidade = res.localidade;
            this.user.bairro = res.bairro;
            this.user.uf = res.uf;
          }
        },
        error => {
          console.error(error)
        }
      )
    }
  

  salvar() {
    try {
      this.userService.add(this.user).then(
        res =>{
          console.log('Dados Salvos firebase...', res);
          this.storage.set('nome', this.user.nome);
          this.storage.set('email', this.user.email);
          this.storage.set('senha', this.user.senha);
          console.log('Dados Salvos...', this.user);
          this.msg.dismissedLoding();
          this.msg.presentAlert('Alerta','Usuário Cadastrado.');
          this.user = new User();
          this.router.navigate(['']);
           
        },
        erro =>{
          console.log('Erro...',erro);
          this.msg.dismissedLoding();
          this.msg.presentAlert('Alerta','Usuário Cadastrado.');
        }
      ) 
    } catch (error) {
      console.error("Erro ao salvar.", error);
      this.msg.dismissedLoding();
      this.msg.presentAlert("Erro","Não Foi possivel salvar.");
    }

  }
  
}
