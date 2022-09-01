import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateNftService } from "./create-nft.service";


@Component({
    selector: 'create-nft',
    templateUrl: './create-nft.component.html',
    styleUrls: ['./create-nft.component.scss']
})

export class CreateNftComponent {

    @ViewChild('imgSrc') imgSrc!: ElementRef;


  constructor(private createService: CreateNftService) { }

  createForm = new FormGroup({
    image: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {

  }

  async onSubmit() {
    if(!this.createForm.valid) {
        return;
    }


    const image = this.createForm.value.image;
    const name = this.createForm.value.name;
    const desc = this.createForm.value.description;

    if(!image) {
      return;
    }
    if(!name) {
      return;
    }
    if(!desc) {
      return;
    }

    await this.createService.createNft(image, name, desc).then(res => {
      console.log(res);
    });

}





  onDropFile(e: any) {
    e.preventDefault();

    if(e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  onSelectFile(e: any) {
    if(e.target.files[0]) {
      const file = e.target.files[0];
      this.handleFile(file);
    }
  }

  handleFile(file: any) {
    let reader = new FileReader();

    reader.onload = e => {
      this.imgSrc.nativeElement.src = e.target?.result;
      this.imgSrc.nativeElement.style.width = '250px';
      this.imgSrc.nativeElement.style.height = '250px';

      document.getElementById('image-border')!.style.border = 'none';

    };
    reader.readAsDataURL(file);

    this.createForm.patchValue({
      image: file
    });
  }

  patchImage(file: any) {
    this.createForm.patchValue({
      image: file
  });
  }

}