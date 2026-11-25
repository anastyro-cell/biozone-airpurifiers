function number_format( number, decimals, dec_point, thousands_sep ) {  // Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://crestidg.com)

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return km + kw + kd;
}
   
   
function faq(id){
    $('#faq_group' + id).slideToggle("300");
    $('#faq_group_title' + id).toggleClass("is-active");
}

function showmenu(){
    $('body').toggleClass("is-active");
    $('#menu_btn .hamburger').toggleClass("is-active");
}  

function hidemenu(){
    $('body').removeClass("is-active");
    $('#menu_btn .hamburger').removeClass("is-active");
}  


function shtukiup(id){
    document.getElementById('shtuki_' + id).value ++;
}

function shtukidown(id){
    document.getElementById('shtuki_' + id).value --;
    if(document.getElementById('shtuki_' + id).value < 1){
        document.getElementById('shtuki_' + id).value = 1;
    }
}

function AddToCart(id){
    
    $.getJSON("/plugins/addtocart.php", {
        id_good: id,
        kolvo: $('#shtuki_' + id).val()
    },
    function(data){
        if(data.err == ""){
            $('#cart_kolvo').html(data.kolvos);
            $('#toorder_' + id).removeClass("hidden");
            $('#addtocart_' + id).addClass("hidden");
//            ym(23190697,'reachGoal','ADDTOCART');
           
	}else{
	    alert(data.err);
	}
    });    
}

function ShowLoginTab(id){
    var nonid = id == 1 ? 0 : 1;
    $('#login_tab_' + nonid).animate({opacity:"hide"}, 200, function (){
        $('#login_tab_' + id).animate({opacity:"show"}, 200);    
    });    
    
    $('#login_tab_a' + nonid).removeClass('login_tab_active');
    $('#login_tab_a' + id).addClass('login_tab_active');
    
}

function shtukiupcart(id){
    document.getElementById('shtuki_' + id).value ++;
    InCart(id, true);
}
function shtukidowncart(id){
    document.getElementById('shtuki_' + id).value --;
    if(document.getElementById('shtuki_' + id).value < 1){
        document.getElementById('shtuki_' + id).value = 1;
    }
    InCart(id, false);
}

function InCart(id, down_on_error){
    $.getJSON("/plugins/addtocart.php", {
        id_good: id,
        kolvo: $('#shtuki_' + id).val(),
        incart: 1
    },
    function(data){
        if(data.err == ""){
            $('#cart_kolvo').html(data.kolvos);
            $('#cart_rub').html(data.summa);
            $('#order-page').html(data.cart);
            //ym(54667432,'reachGoal','ADDTOCART');
            //ym(35841015,'reachGoal','ADDTOCART');
            //gtag('event', 'add_to_cart', { "currency": "RUB", "items": [{"id": id, "quantity": $('#shtuki_' + id).val(), "price": data.price_g, "name": data.name_g, "brand": data.brand_g}]});
            
	}else{
	    alert(data.err);
            if(down_on_error){
                document.getElementById('shtuki_' + id).value = $('#shtuki_' + id).val() * 1 - 1;
            }
	}
    });    
}


function sendsms(){
    $.getJSON("/plugins/sendsms.php", {
        phone_code: $('#phone_code').val(),
        phone: $('#phone_inp').val()
    },
    function(data){
        if(data.err == ''){
            $('#sendsms_err').css('display', 'none');
            $('#sendsms_row').css('display', 'none');
            //$('#loginsms_row').animate({opactiy:"show"}, "slow");
            $('#inputcode_row').animate({opactiy:"show"}, "slow");
            $('#smscode1').focus();
        }else{
            $('#sendsms_err').animate({opactiy:"show"}, "slow");
            $('#sendsms_msg').html(data.err);
        }
    });
    
}

function sendsms2(){
    
    $.getJSON("/plugins/sendsms.php", {
        phone_code: $('#phone_code').val(),
        phone: $('#phone_inp').val(),
        check_customer: 0
    },
    function(data){
        if(data.err == ''){
            $('#sendsms_err').css('display', 'none');
            $('#sendsms_row').css('display', 'none');
            $('#loginsms_row').animate({opactiy:"show"}, "slow");
            $('#inputcode_row').animate({opactiy:"show"}, "slow");
            $('#smscode1').focus();
        }else{
            $('#sendsms_err').animate({opactiy:"show"}, "slow");
            $('#sendsms_msg').html(data.err);
        }
    });
    
}

function SmsCodeInput(input){
    if(document.getElementById('smscode' + input).value != ''){
        if(input == 4){
            document.getElementById('loginbyphoneform').submit();
        }
        document.getElementById('smscode' + (input + 1)).focus();
    }
}

function SmsCodeInputRegister(input){
    if(document.getElementById('smscode' + input).value != ''){
        if(input == 4){
            $.getJSON("/plugins/register_phone.php", {
                smscode1 : document.getElementById('smscode1').value,
                smscode2 : document.getElementById('smscode2').value,
                smscode3 : document.getElementById('smscode3').value,
                smscode4 : document.getElementById('smscode4').value
            },
            function(data){
                if(data.err == ''){
                    $('#inputcode_row').hide();
                    $('#register_confirm_phone').html("<span style='color:green'>подтвержден</span>");
                    $("#phone_inp").prop('readonly', true);
                }else{
                    $('#smscode_error').html(data.err);
                }
            });

        }else{
            document.getElementById('smscode' + (input + 1)).focus();    
        }
        
    }
}

            var shipping_cost = 0;
            var shipping_cost_sert = 0;
            
            function ShippingChange(){
                var id_shipping = $('input[name="id_shipping"]:checked').val();                
                $('#country_table').hide();
                $('#address_table tr').show();                
                $('#address_table').hide();
                $('#samovyvoz_msg').hide();
                $('#cdek_widjet').hide(); 
                $('#pickpoint_widjet').hide(); 
                $('#cdek_result_address').hide();
                $('#cdek_result_address').val('');
                $('#cdek_result').hide();
                $('#id_cdek').val('');
                $('#pick_result').hide();                
                $('#pochta_widjet').hide(); 
                $("#postindex").prop("readonly", false);
                $("#city").prop("readonly", false);
                
                $('#pek_choose0').hide();
                
                if(id_shipping == 1){
                    $('#samovyvoz_msg').show();
                    shipping_cost = 0;
                    $('#shippingcost').html('0 <i class="fa fa-rub" aria-hidden="true"></i>');
                }else
               
                if(id_shipping == 3){
                    $('#pochta_widjet').show(); 
                    $('#address_table').show();
                    shipping_cost = 0;
                    //$('#shippingcost').html(shipping_cost + ' <i class="fa fa-rub" aria-hidden="true"></i>');
                    $('#shippingcost').html('0 <i class="fa fa-rub" aria-hidden="true"></i>');
                    //$("#postindex").prop("readonly", true);
                    //$("#city").prop("readonly", true);
                    
                }

            
                else{
                    $('#address_table').show();
                }
                ShippingCostNew();
            }
            
            function ShippingCost()
            {
                return ShippingCostNew();
            }
            
            function ShippingCostNew(){
                var total2 = total;
                
                var discountpercent0 = (100-discountpercent * 1)/100;
                total2 = GetTotal(discountpercent0);
                
                shipping_cost = shipping_cost * 1;
                
                $('#shipping0').val(shipping_cost);
                $('#order_total').html(number_format(total2*1 + shipping_cost * 1, 0, '.', ' '));
                
            }   
            
            function GetTotal(discountpercent0){
                return GetTotalDiscount(discountpercent0);
            }
            
            function GetTotalDiscount(discountpercent0){
                var total0 = 0;
                costs_discounted = new Array();
                var good_price; 

                for(var i = 0; i < costs.length; i ++){
                    if(skidki[i] == '1'){
                        good_price = costs[i];
                    }else{
                        good_price = Math.round(costs[i] * discountpercent0);
                    }
                    costs_discounted[i] = good_price;
                    total0 += good_price * counts[i];
                }
                
                
                return total0;
            }     
            
         
        function DisableSubmitButton(submit_btn){
            if(submit_btn){
                $('#sendorder_btn').css('background', '#bcbcbc');
                $('#sendorder_btn').attr('onclick', '');   
                $('#sendorder_btn').html('Отправление...');
            }else{
                $('#sendorder_btn').css('background', '#00aeef');
                $('#sendorder_btn').attr('onclick', 'CheckValues0();');   
                $('#sendorder_btn').html('Оформить заказ!');
            }
        }            
            
            function CheckValues0(){
                //$('#sendorder_btn').attr('onclick', '');   
                    DisableSubmitButton(true);
                    $.getJSON("/plugins/good_nalichie.php", {
                    },
                    function(data){
                        //$('#sendorder_btn').attr('onclick', 'CheckValues0();');   
                        if(data.err == ""){
                            CheckValues();
                            return true;
                        }else{
                            DisableSubmitButton(false);                            
                            alert(data.err);                            
                            return false;
                        }
                    });
                return true;
                
            }
            
            function CheckValues()
            {

                
                if (document.getElementById('fio').value == ''){
                    alert('Пожалуйста, укажите ФИО');
                    document.getElementById('fio').focus();
                    DisableSubmitButton(false);
                    return false;
                }               
                
//                var id_shipping = $('input[name="id_shipping"]:checked').val();
                
                
//                if(id_shipping == 3 && shipping_cost == 0){
//                    alert('Вы не выбрали отделение почты РФ');
//                    DisableSubmitButton(false);
//                    return false;
//                }
//                
//                if(id_shipping == 16 && $('#pek_id').val() == ''){
//                    alert('Вы не выбрали пункт ПВЗ');
//                    DisableSubmitButton(false);
//                    return false;
//                }
//                
                
                if($('input[name="id_payment"]:checked').val() == undefined) {
                    DisableSubmitButton(false);
                    alert('Вы не выбрали способ оплаты');
                    return false;
                }
                
                YaParams();
            }
            
            function YaParams(){

                $.getJSON("/plugins/next_id_order.php", {
        		},
        		function(data){

                            var id_order = data.id_order;


                            var goods_google = new Array();
                            for(var i = 0; i < id_goods.length; i++){

                                goods_google[i] = new Object({id: id_goods[i],  name: goodnames[i],  price: costs[i],  quantity: counts[i], brand: brands[i]});
                                
                            }         
                            
                            try{
                                ym(23190697,'reachGoal','ORDER');
                                //ym(54667432,'reachGoal','ORDERSEND');
                                //ym(35841015,'reachGoal','ORDERSEND');
                                //gtag('event', 'purchase', {"transaction_id": id_order, "value": total, "items": goods_google});
                            } catch(e) {
                                //чего делать?
                            } finally {
                                document.getElementById('orderform2').submit();                                
                            }                            

			});                
                        
                    
            }
