var div;
var val;

function ordem(){
	menor = "";
	y = [];
	x = val.trim().split(",");
	cont = 0;
	//----------------------------------------Limpa vazios
	for(let i=0; i<x.length; i++){
		if(x[i]==""){
			x[i] = "x";
		}
	}
	menor = Math.min.apply(null,x);
	while(isNaN(menor)){
		menor = Math.min.apply(null,x);
		if(x[cont]=="x"){
			x.splice(cont, 1);
			cont = 0;
		}
		cont++;
	}
	
	//----------------------------------------Ordena valores
	cont = 0;
	while(x.length>0){
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
	saida.push(obj);
	return saida;
}

function gerar(){
	div = document.getElementById('msg');
	div2 = document.getElementById('msg2');
	val = document.getElementById('val').value;
	acumula = 0;
	total = 0;
	var string = "<h6 class=\"font-weight-bold\">FREQUENCIA SIMPLES</h6>";
	if(val!=""){
		ordenado = ordem();
		w = contar(ordenado);
		total = ordenado.length;
		string += "<table><tr><th class=\"bord-r\"></th><th class=\"bord-b centro\" colspan=\"4\">Frequência</th></tr><tr><th class=\"bord-r centro\">Valor</th><th class=\"bord-r\">Abs.</th><th class=\"bord-r\">Abs. acum.</th><th class=\"bord-r\">Rel.</th><th>Rel. acum.</th></tr>";
		for(let i=0; i<w.length; i++){
			acumula += w[i].qtd;
			string += "<tr><td class=\"bord-r\">"+w[i].num + "</td><td class=\"bord-r\">"+ w[i].qtd+"</td><td class=\"bord-r\">"+acumula+"</td><td class=\"bord-r\">"+(w[i].qtd/total).toFixed(3)+"</td><td>"+(acumula/total).toFixed(3)+"</td></tr>";
		}
		string += "<tr><td class=\"bord-r bord-t\">Total</td><td class=\"bord-r bord-t\">"+acumula+"</td><td class=\"bord-r bord-t\">-</td><td class=\"bord-r bord-t\">"+(acumula/total)+"</td><td class=\"bord-t\">-</td></tr>";
		string += "</table>";
		div.innerHTML = string;








		var string2 = "<h6 class=\"font-weight-bold\">FREQUENCIA AGRUPADA POR CLASSE - Amplitide: ";
		if(ordenado.length>14 && w.length>3){
			relativoTotal = ordenado.length;
			var classe = [];
			var amp = Math.round((ordenado[total - 1]-ordenado[0])/Math.sqrt(ordenado.length));
			//string2 = "Necessário implementar tabela de frequência com amplitude e classes.";
			string2 += amp+"</h6><table><tr><th class=\"bord-r coluna_p \"></th><th class=\"bord-b centro\" colspan=\"4\">Frequência</th></tr><tr><th class=\"bord-r centro\">Valor</th><th class=\"bord-r sp\">Abs.</th><th class=\"bord-r sp\">Abs. acum.</th><th class=\"bord-r sp \">Rel.</th><th class=\" sp\">Rel. acum.</th></tr>";
			var acum = 0;
			var totalClass = 0;
			classe.push(parseInt(w[0].num));
			for(let i=0; i<=Math.round(Math.sqrt(w.length));i++){
				classe.push(parseInt(w[0].num)+((i+1)*amp));
			}
			var aux;
			aux = classe[0];
			intervalo = [];
			for(let x=0; x<=classe.length; x++){

				for(let i=0; i<w.length; i++){
					if(w[i].num>=classe[x] && w[i].num<(classe[x]+amp)){
						if(classe[x] == aux){
							acum += w[i].qtd;
						}else{
							var obj2 = {};
							obj2 = {val:"",qtd:0};
							obj2.val = (aux<=9?"0"+aux:aux)+" ˫ "+((aux+amp)<=9?"0"+(aux+amp):(aux+amp));
							obj2.qtd = acum;
							totalClass += acum;
							intervalo.push(obj2);
							//string2 += aux+" ˫ "+(aux+amp)+" |"+acum+" <br/>";
							string2 += "<tr><td class=\"bord-r\">"+obj2.val+"</td><td class=\"bord-r\">"+obj2.qtd+"</td><td class=\"bord-r\">"+totalClass+"</td><td class=\"bord-r\">"+(obj2.qtd/relativoTotal).toFixed(3)+"</td><td>"+(totalClass/relativoTotal).toFixed(3)+"</td></tr>"
							aux = classe[x];
							acum = w[i].qtd;
						}
						//console.log(classe[x]+" -> "+(classe[x]+amp)+" - "+w[i].num+"-"+w[i].qtd);						
					}
				}
			}
			obj2 = {val:"",qtd:0};
			obj2.val = aux+" ˫ "+(aux+amp);
			obj2.qtd = acum;
			totalClass += acum;
			intervalo.push(obj2);

			//string2 += aux+" ˫ "+(aux+amp)+" |"+acum+" <br/>";
			if(aux != (aux+amp)){
				string2 += "<tr><td class=\"bord-r\">"+obj2.val+"</td><td class=\"bord-r\">"+obj2.qtd+"</td><td class=\"bord-r\">"+totalClass+"</td><td class=\"bord-r\">"+(obj2.qtd/relativoTotal).toFixed(3)+"</td><td>"+(totalClass/relativoTotal).toFixed(3)+"</td></tr>";
				string2 += "<tr><td class=\"bord-r bord-t\">Total</td><td class=\"bord-r bord-t\">"+ordenado.length+"</td><td class=\"bord-r bord-t\">-</td><td class=\"bord-r bord-t\">"+(totalClass/relativoTotal).toFixed(0)+"</td><td class=\"bord-t\">-</td></tr>";
				string2 += "</table></body></html>";
			}else{
				string2 = "Desnecessária implementação.<br /> Número mínimo de dados da amostra definido: 15 <br /> Numero mínimo de classes: 3";				
			}


		}else{
			string2 = "Desnecessária implementação.<br /> Número mínimo de dados da amostra definido: 15 <br /> Numero mínimo de classes: 3";
		}
		
		div2.innerHTML = string2;
	}
}

//0,1,1.1,1.2,1.2,1.4,1.4,2.1,4.1,,3.2,2,1,1,2,3,4,5,1,5,2,2,4,7,8,9,2,5,7,9,10,0