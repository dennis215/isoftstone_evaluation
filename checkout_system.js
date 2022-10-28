//Variable declaration
var kone_number = 0;
var ironhide_number = 0;
var membership = "";


//Set items standard pricing
var kone_price = 3488.99;
var ironhide_price = 529.99;
var member_kone_price = kone_price;;
var member_ironhide_price = ironhide_price;

//Set membership discount rate
var associate_rate = 0.95;
var diamond_rate = 0.8;

//Show standard pricing
document.getElementById("kone_des").innerHTML = "Kone: RM"+kone_price;
document.getElementById("ironhide_des").innerHTML = "Ironhide Cartridge: RM"+ironhide_price;

//Update membership
function selectMember(member) {
    updatePrice(member);
    let discount_rate = getDiscountRate(member);
    document.getElementById("kone_des").innerHTML = "Kone: RM"+member_kone_price;
    document.getElementById("ironhide_des").innerHTML = "Ironhide Cartridge: RM"+member_ironhide_price;
    if(member !="No Membership"){
        document.getElementById("discount").innerHTML = rounding(discount_rate)+"% Discount applied";
    }else{
        document.getElementById("discount").innerHTML = "";
    }
}

//Update member pricing
function updatePrice(member){
    membership = member;
    if(membership=="associate"){
        member_kone_price = rounding(kone_price*associate_rate);
        member_ironhide_price = rounding(ironhide_price*associate_rate);
    }else if(membership=="diamond"){
        member_kone_price = rounding(kone_price*diamond_rate);
        member_ironhide_price = rounding(ironhide_price*diamond_rate);
    }else{
        member_kone_price = kone_price;
        member_ironhide_price = ironhide_price;
    }
}

//Rounding to 2 decimals
function rounding(num){
    roundedNum = Math.round(num * 100) / 100;
    return roundedNum;
}

//Get discount rate for display
function getDiscountRate(member){
    if(member=="associate"){
        return (1-associate_rate)*100;
    }else if(member=="diamond"){
        return (1-diamond_rate)*100;
    }
}

//Update Kone Number
function updateKoneNumber(num){
    kone_number = num;
}

//Update Ironhide Cartridge Number
function updateIronhideNumber(num){
    ironhide_number = num;
}

//Proceed to Checkout
function checkout(){
    document.getElementById('membership').disabled = true;
    document.getElementById('kone').readOnly = true;
    document.getElementById('ironhide_cartridge').readOnly = true;

    var summary = "Check Out items:" 
    if(kone_number>0){
        summary += "<br> - "+kone_number+"pcs Kone";
    }
    if(ironhide_number>0){
        summary += "<br> - "+ironhide_number+"pcs Ironhide Cartridge";  
    }
    
    document.getElementById('summary').innerHTML = summary;

    calculation();
    let total = getTotal();
    document.getElementById('total').innerHTML = "Total Price of Items = RM"+rounding(total);
}

//Member special offer calculation
function calculation() {
    if(membership=="diamond"){
           if(kone_number>=3){
            member_kone_price = 2588.99;
           }
           if(ironhide_number>=3){
           let ironhide_deduct = Math.floor(ironhide_number/3);
           ironhide_number -= ironhide_deduct;
           }
       }
}

//Get final Pricing
function getTotal(){
    let total = (kone_number*member_kone_price)+(ironhide_number*member_ironhide_price);
    return total;
}