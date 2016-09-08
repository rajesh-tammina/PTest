import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'customDate'})
export class CustomDate implements PipeTransform {
  transform(value: string): String {
      if(value!=null && value!="")
      {
                value=value.split("T")[0];
                var date = Date.parse(value);
              // alert("CustomDate value is:"+value+" inpdate"+date);//+"   changeDate:"+date.getMonth());
               if(date!=null){
               var month = (date.getMonth() + 1)<10?"0"+(date.getMonth() + 1):(date.getMonth() + 1);        // to ensure YYYY-MM-DD format
               var  day = date.getDate()<10?"0"+date.getDate():date.getDate();
               var cmpltDate= month + '/' + day + '/' +  date.getFullYear();
              // alert("cmpltDate is:"+cmpltDate);
               return cmpltDate;
               }
               
      }
      
      return "";
  }
      
}