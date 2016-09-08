

declare var $:any;
var errCall;
 /* $dialog is reference of loading model template.*/  
 

var $dialog = $(
           '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible; top: 50px;">' +
           '<div class="modal-dialog modal-m">' +
           '<div class="modal-body">' +
           '<div class="loader"></div>' +
           '</div></div></div>');

var $errormodal = $('<div class="modal fade" id="myModal" tabindex="-1" '+
                ' role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" > '+
                ' <div class="modal-dialog modal-sm">'+
                ' <div class="modal-content">'+
                ' <div class="modal-header">'+
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                '<h4 class="modal-title" id="myModalLabel">Error</h4>'+
                '</div>'+
                '<div class="modal-body-popup">'+
                '<p>'+window.localStorage.getItem("error")+'</p>'+
                '</div>'+
                  '<div class="modal-footer">'+
                  '<button type="button" class="btn btn-success" data-dismiss="modal" id="successPopup">Close</button>'+
                  
                   '</div>'+
              '</div>'+
        ' </div>'+
      '</div>'
);

export class Utilities{

        /**
         * Module for displaying "Loading ..." dialog using Bootstrap
        *
        * @author Eugene Maslovich <ehpc@em42.ru>
        */  

        waitingDialog = (function ($) {
        'use strict';

        
        

                return {
                /**
                 * Opens our dialog
                 * @param message Custom message
                 * @param options Custom options:
                 *                   options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
                 *                   options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
                 */
                show: function (message, options) {
                        // Assigning defaults
                        if (typeof options === 'undefined') {
                        options = {};
                        }
                        if (typeof message === 'undefined') {
                        message = 'Loading';
                        }
                        var settings = $.extend({
                        dialogSize: 'm',
                        progressType: '',
                        onHide: null // This callback runs after the dialog was hidden
                        }, options);

                        // Configuring dialog
                        $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
                        $dialog.find('.progress-bar').attr('class', 'progress-bar');
                        if (settings.progressType) {
                        $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                        }
                        $dialog.find('h3').text(message);
                        // Adding callbacks
                        if (typeof settings.onHide === 'function') {
                        $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                                settings.onHide.call($dialog);
                        });
                        }
                        // $errormodal.find("#successPopup").off('click').on('click', function (e) {
                        //         //alert("coming in click");
                        //      this.waitingDialog.hide();
                        // });
                        // Opening dialog
                        $dialog.modal();
                },
                /**
                 * Closes dialog
                 */
                hide: function () {
                        $dialog.modal('hide');
                }
                };

        })($);

        handleError(error: any) {
                // In a real world app, we might use a remote logging infrastructure
                // We'd also dig deeper into the error to get a better message
                //alert("coming in error");
                   window.localStorage.removeItem("error");
                clearTimeout(errCall);
                errCall=setTimeout(function(){
                let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.error(errMsg); // log to console instead
                if(error.name == "TokenExpiredError"){
                         showModal("Token Expiration Error");
                          sessionExpired();
                }
               else if(error.status+""=="400"){
                       // sessionExpired();
                       showModal("Some error occured while fetching data from the server");
                }
                else if(error.status+""=="403"){
                    showModal("Server Down please wait for sometime");
                }
                else if(error.Success+""=="false"){
                   showModal("Some error occured!");         
                }
                else if(error.status+""=="500"){
                   showModal("Please check!Some error has occured");         
                }
                else{
                   showModal("Error Occurred!");     
                }
                //alert("error is:"+errMsg);
                   $dialog.modal('hide');
                },0);
        }

        /** For showing loading symbol */
        showLoading(){
                this.waitingDialog.show('', {dialogSize: 'sm', progressType: 'warning'});
        }

        /** For hiding loading symbol */
        hideLoading(){
            this.waitingDialog.hide();
        }
             
                                    
}

function showModal(err){
              window.localStorage.setItem("error",err);
              //alert(window.localStorage.getItem("error"));
               $errormodal.modal('show'); 
        }

  function hideModal(){
        this.waitingDialog.hide();
        } 

function sessionExpired(){
                window.localStorage.removeItem("accountID");
                window.localStorage.removeItem("auth_key");
                window.location.href= "/login/loginForm?status=expired";
              
        }  