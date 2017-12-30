import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NumberToWordsPipe } from './../number-to-words.pipe';
// import * as html2pdf  from "./../../../node_modules/html2pdf.js/dist/html2pdf";
// (() => {
//     html2pdf.start();
//   })()

declare function html2pdf(html2canvas, jsPDF): any;



@Component({
  selector: 'bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
    invoice:any;
    companyDetails:any =  [{
        code:'SRVACPL',
        name:'Sri Ranganathar Valves And Control Private Limited',
        address:'5/239 & 5/240,Karegoundenpalayam,Annur',
        city:'Coimbatore-641697',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33AAWCS8068D1ZV'
        },{
        code:'AVCL',
        name:'Anugraha Valve Castings Limited', 
        address:'391/2, Sengoda goundan Pudur',
        city:'Coimbatore-641407',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33AACCA2285Q1ZF',
        items:[{
            'name':'Carbon steel impact',
            'rate': 60,
            'pieces':true
        },{
            'name':'Stainless steel impact',
            'rate': 80,
            'pieces':true
        },{
            'name':'Stainless steel full length impact',
            'rate': 400,
            'pieces':false
        },{
            'name':'Stainless steel IGC',
            'rate': 80,
            'pieces':false
        }]
    },{
        code:'AVCL5',
        name:'Anugraha Valve Castings Limited(Unit-V)',
        address:'307, Sengoda goundan Pudur',
        city:'Coimbatore-641407',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33AACCA2285Q1ZF' 
    },{
        code:'JJ',
        name:'JJ',
        address:'-',
        city:'Coimbatore',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'-' 
    },{
        code:'MASPL',
        name:'Mira Alloy Steels Private Limited',
        address:'S.F.No 363,Kurumbapalayam',
        city:'Coimbatore-641107',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33AAICS1449JIZ9' 
    },{
        code:'REW',
        name:'Rukmani Engineering Works',
        address:'5/235/C4,Kuppanaiken Road, Somayampalayam',
        city:'Coimbatore-641108',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33ACQPR8448H1ZZ' 
    },{
        code:'SSACIPL',
        name:'S.S.A Castings India Private Limited',
        address:'Plot no 90-c Cosmafan foundry cluster park-1,Arasur',
        city:'Coimbatore-641407',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33AAKCS9336C1ZC' 
    },{
        code:'SRI',
        name:'Sri Ranganather Industries',
        address:'12/45,Thadagam main road',
        city:'Coimbatore-641025',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33AADCS0183Q1Z3' 
    },{
        code:'SRVPL',
        name:'Sri Ranganathar Valves Private Limited',
        address:'7/109, Arasur',
        city:'Coimbatore-641407',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33AALCS5492C1ZA' 
    },{
        code:'URCAAPL',
        name:'UR Castings And Alloys Private Limited',
        address:'S.F.No-76&80,Thirumalayampalayam Post',
        city:'Coimbatore-641105',
        state:'Tamilnadu',
        stateCode:'33',
        gst:'33AAACU7496B1ZD' 
    }];

    selectedCompany:any;
    selectedItem:any;
    date:any;
    totalCount:any;
    totRate:any;
    totMaterialPieces:any;
    totMaterialCount:any;
    itemsArray:any = [];
    grandTotal:any;
    cgstRupee:any;
    cgstPaise:any;
    sgstRupee:any;
    sgstPaise:any;
    totIncGst:any;
    cgstRupeeWord:any;
    cgstPaiseWord:any;
    sgstRupeeWord:any;
    sgstPaiseWord:any;
    totIncGstRupeeWord:any;
    totIncGstPaiseWord:any;
    selectedItemName:any;
    showDateUpdate:boolean = true;
    supplyDate:any;
    showInvoiceOption = true;
    displayBill:boolean = true;
    
    constructor (private router: Router,private activatedRoute: ActivatedRoute,private numberToWordsPipe: NumberToWordsPipe){}

    ngOnInit(){
        this.invoice = localStorage.getItem('upcomingInvoice')
        this.date = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
        this.supplyDate = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
        this.companyDetails.forEach(element => {
            if(element.code === this.activatedRoute.snapshot.queryParams["company"]){
                console.log(element)
                this.selectedCompany = element;
            }
        });
        let modal = document.getElementById('myModal');
        let btn = document.getElementById("myBtn");
        let span = document.getElementById("close");
        btn.onclick = function() {
            modal.style.display = "block";
        }
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }
    
    backToHome = function(){
        this.router.navigate(['/home'])
    }

    newItem = function(data){
        this.selectedCompany.items.forEach(element => {
            if(element.name === data){
                this.selectedItem = element
            }
        });
    }

    materialCount = function(material,count){
        this.totMaterialPieces = material,
        this.totMaterialCount = count,
        this.totalCount = material*count;
        this.totRate = this.totalCount*this.selectedItem.rate;
    }

    totalQty = function(count){
        this.totalCount = count;
        this.totRate = count*this.selectedItem.rate;
    }

    addItem = function(){
        if(this.selectedItem.pieces){
            this.itemsArray.push({
                'desc':this.selectedItem.name+'('+this.totMaterialPieces+'*'+this.totMaterialCount+'='+this.totalCount+')',
                'rate':this.selectedItem.rate,
                'qty':this.totalCount,
                'total':this.totRate
            })
        }
        else{
            this.itemsArray.push({
                'desc':this.selectedItem.name,
                'rate':this.selectedItem.rate,
                'qty':this.totalCount,
                'total':this.totRate
            })
        }
        console.log(this.itemsArray);
        this.selectedItem = null;
        this.selectedItemName = null;
        this.totRate = null;
        this.material = null;
        this.count = null;
        this.total = null;
        this.totalCount = '';  
        this.displayBill = false;      
    }

    deleteItem = function(data){
        console.log(data);
        let arrayCount = 0
        this.itemsArray.forEach(element => {
            arrayCount++;
            if(element === data){
                this.itemsArray.splice(arrayCount-1,1)
                console.log("match found",arrayCount)
            }
        });
    }

    loadBill = function(){
        this.grandTotal = 0;
        let count = 0;
        this.itemsArray.forEach(element => {
            this.grandTotal = this.grandTotal+element.total;
            count++;
            if(count === this.itemsArray.length){
                this.calculateGst();
            }
        });
    }

    calculateGst = function(){
        console.log("loaded");
        this.cgstRupee = Math.floor((this.grandTotal*9)/100);
        this.cgstPaise = (this.grandTotal*9)%100;
        let totCgst = this.cgstRupee+'.'+this.cgstPaise;
        console.log(totCgst)
        this.sgstRupee = Math.floor((this.grandTotal*9)/100);
        this.sgstPaise = (this.grandTotal*9)%100;
        let totSgst = this.sgstRupee+'.'+this.sgstPaise;
        console.log(totSgst);
        console.log(parseFloat(totCgst) + parseFloat(totSgst))
        console.log(this.grandTotal + parseFloat(totSgst));
        this.totIncGst = (parseFloat(this.grandTotal) + (parseFloat(totCgst) + parseFloat(totSgst))).toFixed(2);
        console.log(this.totIncGst);

        this.cgstRupeeWord = this.numberToWordsPipe.transform(Math.floor((this.grandTotal*9)/100));
        this.cgstRupeeWord = this.cgstRupeeWord.charAt(0).toUpperCase() + this.cgstRupeeWord.slice(1)
        this.cgstPaiseWord = this.numberToWordsPipe.transform((this.grandTotal*9)%100);
        this.sgstRupeeWord = this.numberToWordsPipe.transform(Math.floor((this.grandTotal*9)/100));
        this.sgstRupeeWord = this.sgstRupeeWord.charAt(0).toUpperCase() + this.sgstRupeeWord.slice(1)

        this.sgstPaiseWord = this.numberToWordsPipe.transform((this.grandTotal*9)%100);
        this.totIncGstRupeeWord = this.numberToWordsPipe.transform(Math.floor(this.totIncGst));
        this.totIncGstRupeeWord = this.totIncGstRupeeWord.charAt(0).toUpperCase() + this.totIncGstRupeeWord.slice(1)
        if(this.totIncGst.toString().split('.')[1]){
            this.totIncGstPaiseWord = this.numberToWordsPipe.transform(this.totIncGst.toString().split('.')[1])
            console.log(this.totIncGstPaiseWord);

        }else{
            this.totIncGstPaiseWord = "";
        }

    }

    
    showDateOption = function(){
        this.showDateUpdate = false;
    }

    updateDate = function(newDate){
        if(newDate){
            this.supplyDate = newDate.split('-')[2]+"/"+newDate.split('-')[1]+"/"+newDate.split('-')[0]
            this.showDateUpdate = true;
        }else{
            this.showDateUpdate = true;
        }
    }
    updateInvoice = function(){
        this.showInvoiceOption = false;
     }

    changeInvoice = function(newInvoice){
        if(newInvoice){
            localStorage.setItem('upcomingInvoice',newInvoice.toString())
            this.invoice = localStorage.getItem('upcomingInvoice')
            this.showInvoiceOption = true;
        }else{
            this.showInvoiceOption = true;
        }
    }

    submit = function(billContent){

        document.body.innerHTML=document.getElementById(billContent).innerHTML;
        html2pdf(document.body,{
            margin: 0.5,
            filename:     localStorage.getItem('upcomingInvoice')+"("+new Date().getDate()+"-"+(new Date().getMonth()+1)+").pdf",
            });
        localStorage.setItem('upcomingInvoice',(parseInt(this.invoice)+1).toString());

       setTimeout(function(){
        window.print();
        location.reload();
       },1000)
    }

    print = function(){
        window.print();
        location.reload();
    }
 
}
