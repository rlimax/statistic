var div;
var val;

function ordem(){
	menor = "";
	y = [];
	x = val.trim().split(",");
	cont = 0;
	//Limpa vazios
	while(menor==""){
		menor = Math.min.apply(null,x);
		if(x[cont]==""){
			console.log(x[cont]);
			x.splice(cont, 1);
			cont = 0;
		}
		cont++;
	}
	//Ordena valores
	cont = 0;
	while(x.length>0){
		//console.log(menor);
		menor = Math.min.apply(null,x);
		if(x[cont]==(menor)){
			y.push(x[cont]);
			x.splice(cont,1);
		}
		cont++;
		if(cont>=x.length){
			cont = 0;
		}
	}
	return y;
}

function contar(x){
	var saida = [];
	var entrada = x;
	var	qtd = 0;
	var anterior;
	var numero;
	var quantidade = 0;
	anterior = entrada[0];
	for(let i=0; i<entrada.length; i++){
		numero = entrada[i];
		if(numero == anterior){
			qtd++;
		}else{
			var obj = {num:0, qtd:0};
			obj.num = anterior;
			obj.qtd = qtd;
			//console.log(obj);
			saida.push(obj);
			anterior = entrada[i];
			qtd = 1;
		}
	}
	var obj = {num:0, qtd:0};
	obj.num = anterior;
	obj.qtd = qtd;
	//console.log(obj);
	saida.push(obj);
	return saida;
}

function gerar(){
	div = document.getElementById('msg');
	val = document.getElementById('val').value;
	//console.log(val);
	
	acumula = 0;
	total = 0;
	if(val!=""){
		ordenado = ordem();
		w = contar(ordenado);
		for(let i=0; i<w.length; i++){
			total += w[i].qtd;
		}
		console.log(total);
		var string = "<table><tr><th class=\"bord-r\"></th><th class=\"bord-b centro\" colspan=\"4\">Frequência</th></tr><tr><th class=\"bord-r centro\">Valor</th><th class=\"bord-r\">Abs.</th><th class=\"bord-r\">Abs. acum.</th><th class=\"bord-r\">Rel.</th><th>Rel. acum.</th></tr>";
		for(let i=0; i<w.length; i++){
			acumula += w[i].qtd;
			string += "<tr><td class=\"bord-r\">"+w[i].num + "</td><td class=\"bord-r\">"+ w[i].qtd+"</td><td class=\"bord-r\">"+acumula+"</td><td class=\"bord-r\">"+(w[i].qtd/total).toFixed(3)+"</td><td>"+(acumula/total).toFixed(3)+"</td></tr>";
		}
		string += "<tr><td class=\"bord-r bord-t\">Total</td><td class=\"bord-r bord-t\">"+acumula+"</td><td class=\"bord-r bord-t\">-</td><td class=\"bord-r bord-t\">"+(acumula/total)+"</td><td class=\"bord-t\">-</td></tr>";
		string += "</table>";
		div.innerHTML = string;
	
	}
}