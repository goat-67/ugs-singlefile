// CONFIG
var USER = "aidenbblood-star";
var REPO = "Mygames"; // The repo where your actual game FOLDERS are
var BRANCH = "main";

// YOUR LIST
var manualList =  [
    // A-C (Existing)
    'cl1','cl10bullets','cl10minutestildawn','cl1on1soccer','cl1v1lol','cl2048','cl3dash','clageofwar','clamongus','clbadicecream','clbasketballstars','clbloonstd5','clbobtherobber','clburritobison','clcactusmccoy','clcatmario','clceleste','clchess','clcommandandconquer',
    
    // D-G
    'cldadish','cldadish2','cldadish3','cldarkestdungeon','cldeadzeal','cldeeploio','cldiepio','cldigdug','clDinoRun','cldisneychess','cldoge2048','cldoom','cldoubledragon','cldragonfist3','cldriveyourplow','clducklife','clducklife2','clducklife3','clducklife4','clearthbound','clentertherungeon','clevaporation','clevilevo','clevolution','clfallguys','clfancypants','clfancypants2','clfancypants3','clfeedus','clfeudalism','clfireboywatergirl','clfireboywatergirl2','clfireboywatergirl3','clfireboywatergirl4','clfireboywatergirl5','clfireboywatergirl6','clflappybird','clfootballlegends','clfridaynightfunkin','clfunny-shooter-2','clgetawayshooters','clgeometrydash','clget-on-top','clgorn','clgo-wagon','clgta-v-scratch','clgunmayhem','clgunmayhem2',
    
    // H-M
    'clhappywheels','clheli-attack-3','clhexgl','clhobomobo','clhouseofdead','clhovercraft','clhungryshark','climpossiblequiz','climpossiblequiz2','clinsaniquarium','cliron-snout','clitchio','cljacksmith','cljanissary-tower','cljelly-truck','cljetpack-joyride','cljuice-box','clkaizo-mario','clkarate-blazers','clkeep-out','clkey-draw','clking-of-fighters','clkirby-nightmare','clknights-of-the-round','cllearntofly','cllearntofly2','cllearntofly3','cllegend-of-zelda','cllife-the-game','clline-rider','cllittle-alchemy','clmad-alin-posse','clmadness-combat','clmario-64','clmario-kart','clmario-world','clmega-man','clmetal-slug','clminecraft','clminibattles','clminipars','clmother-load','clmutilate-a-doll-2',
    
    // N-S
    'cln-game','cln-gon','clnaruto-v-bleach','clnba-jam','clneon-racer','clnitrome','clno-duck-life','clomeglio','clone-night-at-flumptys','cloot-randomizer','clovoo','clpacman','clpaper-io','clpaper-minecraft','clpapas-pizzeria','clpapas-freezeria','clpapas-scooperia','clpapas-burgeria','clpenalty-shooters-2','clpixel-gun-3d','clplants-vs-zombies','clpokemon-emerald','clpokemon-fire-red','clpoki','clportal','clpowerline-io','clprizefighters','clpuppet-hockey','clquake','clraft','clraft-wars','clraft-wars-2','clrandom-runners','clred-ball-4','clretro-bowl','clriddle-school','clriddle-school-2','clriddle-school-3','clriddle-school-4','clriddle-school-5','clriddle-transfer','clroblox','clrooftop-snipers','clrun-3','clsausage-run','clscribble-io','clshadow-the-hedgehog','clshady-bears','clshellshockers','clsimpsons','clskate-hooligans','clslope','clsmash-karts','clsmash-remix','clsnow-rider-3d','clsonic-the-hedgehog','clsort-the-court','clspace-invaders','clspiderman','clstair-race','clstickman-hook','clstreet-fighter-2','clsubway-surfers','clsuper-mario-bros','clsuper-mario-maker','clsuper-mario-odyssey','clsuper-smash-flash-2','clsword-masters',
    
    // T-Z
    'cltag','cltank-trouble','cltemple-run-2','clterraria','cltetris','clthe-binding-of-isaac','clthe-final-earth','clthe-henry-stickmin-collection','clthe-last-stand','clthe-sims','clthe-worlds-hardest-game','clthrill-rush','cltic-tac-toe','cltiny-fishing','cltom-and-jerry','cltomb-of-the-mask','cltoon-cup','cltotally-accurate-battle-simulator','cltower-defense','cltower-of-hell','cltown-of-salem','cltunnel-rush','clultimate-knockout','clunblocked-games-66','cluno','clvex-3','clvex-4','clvex-5','clvex-6','clvex-7','clwater-marbles','clwheelie-bike','clworld-of-goo','clwormate-io','clworms-zone','clxiaoxiao','clx-trial-racing','clyahtzee','clyoutube','clzelda','clzombie-derby','clzombie-tsunami'
];


function buildStash() {
    const container = document.getElementById('sections-container');
    if (!container) return; 
    container.innerHTML = "";
    const groups = {};

    manualList.forEach(folder => {
        let cleanName = folder.replace(/^cl/i, ''); // Strip 'cl' so headers aren't all 'C'
        let firstChar = cleanName.charAt(0).toUpperCase();
        let letter = /^[0-9]/.test(firstChar) ? "0-9" : firstChar;
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push({ folder, cleanName });
    });

    Object.keys(groups).sort().forEach(letter => {
        const section = document.createElement('div');
        section.id = `section-${letter}`;
        section.innerHTML = `<div class="letter-header">${letter}</div><div id="btns-${letter}"></div>`;
        container.appendChild(section);

        groups[letter].sort((a, b) => a.cleanName.localeCompare(b.cleanName)).forEach(game => {
            const btn = document.createElement('input');
            btn.type = "button";
            btn.value = game.cleanName.toUpperCase();
            btn.className = "game-btn";
            btn.onclick = () => window.location.href = `https://cdn.jsdelivr.net/gh/${USER}/${REPO}@${BRANCH}/${game.folder}/index.html`;
            document.getElementById(`btns-${letter}`).appendChild(btn);
        });
    });
}


