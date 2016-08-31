export class ReflectionModel{
      
        UserNotes: String;
        UpdatedTimeStamp: Date;
        Today:Date;

      constructor(){
        this.UpdatedTimeStamp = new Date;
        this.UserNotes ="";
        this.Today=new Date;
      }
}

export class ReflectionPostModel{
      
        UserNotes: String;
        UpdatedTimeStamp: Date;
        Today:Date;

      constructor(){
        this.UpdatedTimeStamp = new Date;
        this.UserNotes ="";
        this.Today=new Date;
      }
}