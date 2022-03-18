const POKE_API_URL="https://pokeapi.co/api/v2",searchPokemonForm=document.getElementById("searchPokemonForm"),pokemonInput=document.getElementById("pokemonInput"),getPokemonData=async e=>{const t=document.getElementById("searchMessage");try{const o=await fetch(`${POKE_API_URL}/pokemon/${e.toLowerCase()}`),{id:n,name:s,height:m,weight:a,types:c,stats:i,sprites:p}=await o.json(),r={id:n,name:s,img:p.other.home.front_default,height:m/10,weight:a/10,types:c.map((({type:e})=>e.name)),stats:i.map((({base_stat:e,stat:t})=>({name:t.name,value:e})))};return t.classList.remove("error"),t.classList.add("success"),t.textContent="Pokémon was succesfully found",r}catch(e){throw t.classList.remove("success"),t.classList.add("error"),t.textContent="Pokémon does not exist, please try again",new Error("Pokémon does not exist, please try again")}},setPokemon=({id:e,name:t,img:o,height:n,weight:s,types:m,stats:a})=>{const c=document.getElementById("pokemonName"),i=document.getElementById("pokemonId"),p=document.getElementById("pokemonHeight"),r=document.getElementById("pokemonWeight"),d=document.getElementById("pokemonImage"),l=document.getElementById("pokemonTypes"),g=document.getElementById("pokemonStats");c.textContent=t,i.textContent=`#${e}`,p.textContent=n,r.textContent=s,d.setAttribute("src",o),l.innerHTML=m.map((e=>`<li class="pokemon__type">${e}</p>`)).join(" "),g.innerHTML=a.map((({name:e,value:t})=>`<li class="pokemon__stat">${e.replace("-"," ")}: ${t}</li>`)).join(" ")};searchPokemonForm.addEventListener("submit",(async e=>{e.preventDefault();const t=pokemonInput.value,o=await getPokemonData(t);setPokemon(o)}));
//# sourceMappingURL=index.200463c4.js.map
