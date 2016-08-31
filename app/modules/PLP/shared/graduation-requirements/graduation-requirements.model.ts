export class GraduationRequirementsModel{
          Titles= new TitlesClass;
  ReqItems: [ ReqItemsClass ];
  Totals=new TotalsClass;
}
class TitlesClass{
    CustomTitle1: String;
    ReqColTitle1:String;
    CustomTitle2: String;
    ReqColTitle2: String;
    CustomTitle3: String;
    ReqColTitle3: String;

}
class ReqItemsClass{
      Subject: String;
      Credit1: String;
      Credit2: String;
      Credit3: String;
}
class TotalsClass{
    
    Credit1: "";
    Credit2: "";
    Credit3: "";
    Note: "";
  
}