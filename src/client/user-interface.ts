import $ from 'jquery';
import { WeightResult } from './types/weight-result.entry';
import * as PIXI from 'pixi.js';
import { resolve } from 'path';

async function wait(millis:number) {
    const promsise = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();    
        }, millis);
    });
    return promsise;
}

export class GUI {
    constructor() {}



    public init() {

     /*   document.addEventListener('mousedown', (event) => {
            $(this.canvas).addClass('canvas');
            $(this.canvas).removeClass('canvasFront');

           // document.body.dispatchEvent(new Event('mousedown');
        });
*/
        $('.home-class').show();
        $('.about-me').hide();
        $('.portfolio').hide();

        $('#home-button').on('click', () => {
            $('.home-class').show();
            $('.about-me').hide();
            $('.portfolio').hide();

            $('#content').removeClass('content-portfolio');
         //   $('#content').addClass('content');

            if(this.projectPic) {
                this.stage.removeChild(this.projectPic);
                this.projectPic = null;
            }
        });

        $('#about-button').on('click', async () => {
            $('.home-class').hide();
            $('.about-me').show();
            $('.portfolio').hide();

            if(this.projectPic) {
                this.stage.removeChild(this.projectPic);
                this.projectPic = null;
            }
            $('#content').removeClass('content-portfolio');
         //   $('#content').addClass('content');
            
        });

        $('#portfolio-button').on('click', () => {
            $('.home-class').hide();
            $('.about-me').hide();
            $('.portfolio').show();

            const projectNames: string[] = [
                'Frozenbyte Oy - Starbase',
                'Mooncat Riddle',
                'WegGL2 Renderer',
                'Quicksave Interactive Oy - Balloon Boy',
                'Quicksave Interactive Oy - Best & Bester',
                'Bugbear Oy - Wreckfest',
                'WordManip',
                'RiverGames Oy - Wheelie Racing',
                'Physically Based Renderer',
                'Escape - Hackathon Junction 2016 Game Jam',
                'What The Fish',
                'Bittetris',
                'Betting Analyzer',
                'Phorm: Multi-platform Game',
                'Tank Basterds: Virtual Reality Environment',
                'HIPSTER',
                'MultiTouch Oy - RockThrowing',
                'Inverse Kinematics - Bachelor\'s Thesis',
                'Raytracer',
                'Stanford Bunny',
                'Cloth: Damper-Spring Mass Model',
                'L-System: Plant',
                'Free Form Deformation: Ball Pipe',
                'Particle System: Leaves',
                'Ball Labyrinth',
                'Casino Card Game',
                'Mooncat: Moonlandia'

            ];

            const descs: string[] = [
                'Starbase is a 3D triple A game that I developed during my time at Frozenbyte Oy. I was mainly working on game\'s gameplay and user interface but also got to touch a bit of graphics as well as I fixed the particle systems for instace. My work required to handle with the animations as well.',
                'Mooncat Riddle is a F2P word game that I developed further with my friend from WordManip which is a game I developed earlier. In this game player tries to get to target word from given start word with set of actions the player can do. The player can either add, remove or replace letters on the table by using the letters outside the table. All the intermediate words must be existing words so the player can\'t move any letter wherever they want. From genre this is a word puzzle and the player has to think first how he is going to do the tasks. ',
                'WebGL2 Renderer is a project that I started in the summer 2019 during my time at Quicksave Interactive. At Quicksave we used TypeScript for everything and as a graphics programmer I was curious to test to implement a WebGL2 based 3D renderer with TypeScript. I integrated Quicksave\'s 2D UI system to the renderer but after I left Quicksave I removed that from the renderer and made my own user interface renderer to it. After Quicksave time I have also continued to implement other features to this project. <br> <br>By the time of writing this the renderer implements following features:<br><br>3D scene graph from which the objects a collected to arrays for both opaque and transparent object for rendering.<br>Physically Based Shaders for rendering static and morphed geometry. (also skinned meshes in the future)<br>Shadow map rendering for point lights and directional light<br>Post processing effect, including bloom, gray scale and tone mapping<br>2D overlay rendered using a texture atlas render texture<br>An 2D animation system for the overlay to animate sprite position, rotation, scale and transparency with easings<br>Skybox rendering<br>L-system for generating trees like in the picture above<br>Instanced rendering for rendering a lot of objects like grass<br>Height map generation from a height texture<br>Raycasting through the screen for picking the objects.<br>Shaders share uniform buffer objects<br>Technique file for shaders for handling shader permutations<br>Scenes are loaded from JSON file<br>Materials are loaded from JSON material file<br>Meshes are also loaded from JSON mesh file (static and morphed meshes)<br>Billboards for textures and floating texts<br>Terrain rendering with terrain shader<br>Vertex shader displacement mapping as WebGL2 does not support tessellation shaders<br>Particle systems<br> ',
                'Balloon Boy is a game that I developed at Quicksave some time. I worked with the engine of the game and integrated Box2D with PIXI.js. Moreover, I implemented some minigames logics to the actual game.',
                'Best & Bester is a game of funny illogical comparisons between two funny character Best and Bester who try to find the best thing in the world. The game is released by Quicksave Interactive Ltd where is work at the moment. I can be played in Facebook Messenger.<br><br>I made some bug fixes to the game. Some features I made included sounds and music improvements, and rendering optimization. ',
                'Wreckfest is a car game released by Bugbear Entertainment Ltd. It was released on consoles. I worked on this game\'s graphics while working at Bugbear as a graphics programmer trainee. <br><br>My tasks included different kinds of shader tricks to the game, including physically based rendering and billboard clutter and dirt map to add dirt to the car while driving on a dirty surface. I worked also on motion blur and mask that was needed there for the car not to be blurred. I did normal map compression better to prevent artifacts on the object surfaces. ',
                'WordManip is a word manipulation game where the purpose is to form words from others using operations including adding letters, removing or changing them. For instance, fought -> bought -> brought. In the example f was first changed to b and then r was added between b and o.<br>br>The game uses a trie data structure for handling and recognizing the words. The optimal paths and their lengths from other words to others were solved algorithmically. For instance, the optimal path from fought to brought is of length two. ',
                'Wheelie Racing is a wheelie racing game where player tries to make wheelies and buy better bikes and new levels. The game was released by RiverGames Oy with Red Bull. I worked on this game while working at RiverGames Oy.<br><br>I implemented some features to the game. Additionally I worked on the games monetization side. I integrated following services to the game: Unity In-App Purchases, Apple and Google Play leaderboards, Fyber advertisements, app tracking using AppsFlyer and Flurry Analytics. ',
                'Physically Based Renderer is a graphics renderer I programmed from winter/spring 2017 on while learning about OpenGL\'s basic and advanced topics. In the project I utilized several technologies and libraries. OpenGL context is created with SDL2. SDL2 also handles input, including keyboard and mouse. SDL2_Image library loads the textures and GLM library is used for mathematics, including matrices and vectors. Model loading is done with Assimp.<br><br>In the application I have implemented following things:<br><br>Physically based renderer that uses albedo, ambient occlusion, metallic, roughness, displacement and normal maps.<br>Render context switch.<br>Height map reading for the ground.<br>Texture loading using SDL2_Image.<br>Model loading using Assimp.<br>Bounding volume (sphere) and view frustum culling.<br>Raycasting.<br>Camera movement and rotation.<br>Skybox as cube map. ',
                'Escape is a prison escape game our 5 member team designed and developed in Hackathon Junction 2016 Game Jam. A core mechanics in this game is to beware the spotlights which are guards that shoot when they catch the prisoner in the spotlight. During the project we improved our team working skills and deepened our knowledge about Unity.',
                'What The Fish is a fish game I developed during the years 2016 and 2017. Player moves a fish and competes agaist time in a river that has obstacles, including stones, explosive barrels, poison etc. Game was programmed in C# using Unity3D as a game engine. Game uses skinning for rendering the fish movement. ',
                'Bittetris is a game I programmed in summer 2016 using C# and Unity3D. The name for the game comes from words bitter and tetris since the game is a modified tetris where there is a good versus evil (bitterness) theme going on. So called evilminos try to cause trouble to the player the way they do. I implemented basic tetris functionality and two other tetrominos, so called goodmino and evilmino. I added some visual effects to the game, such as animating the tetromino blocks color between two colors and shaking the camera as the tetrominos land on the play field. Also added some particle effects. This game is ready to be released in App Store and will be my first completely personal released title. I will release it in the store once I can afford to register as a Apple developer which costs 100 USD per year.' ,
                'Betting Analyzer was a app I designed during the spring 2016. The motivation for this app was that I wanted to find out whether it is profitable to bet on sports events (football and ice hockey) with certain betting strategies. I created an application that downloads archived sports events from the web. Sports events included data from the actual match which is the teams and the result of the match and also the odds for each result: home win, tie and away win.<br><br>The betting strategies go as follows: We select a team from a league and start to bet on it. There are 3 cases. Whether we always bet the selected team to win, or to have always a tie game, or always lose. Once we have selected one of these 3 strategies, we have a pattern that we follow in placing the amount of the bet. Constant Bet strategy means that we always place a bet that is a constant regardless of the result of the previous bet. Linear Bet strategy means that we always linearly increase the current bet while we lose the previous bet until we win. Once we win, we start again from the initial bet. Linear Steep Compensate Bet strategy means same as Linear Bet strategy but in this case we select a number of losses that we are willing to continue linear increase in bets. While we lose more games in a row than "number of losses" selected, we continue with a steeper increase in bets from that point on until we win. The final strategy is called Exponential Bet strategy. In this strategy we always double the previous bet while we keep losing until we win.<br><br>This app analyzes these betting strategies using the archived sports events. We use these strategies to archived sports results as if we had placed bets on them in the past in real. This app renders a graph (for a selected betting strategy) that consists of discrete points of which each represents a single bet. The graph then tells would we have won money or lost after for instance 30 matches. If the final point in the graph is on the positive side of X axis, then we would have won some money. Otherwise we lost money and know that there is no use to use that betting strategy on sports events since we would lose money instead of winning it.<br><br>I created the betting analyzer app using Unity 3D. This project was a useful mathematical exercise in coding C#. Moreover, I advanced my knowledge about Unity 3D, especially user interface knowledge. ',
                'This game was produced during the years 2012-2013 and was started in the Media Lab course Game Project which belongs to Special Module in Game Design and Production. It was my first game project with a team of six student members. Each student had their own role in the development process. My role was game programming which included programming game mechanics and in-game level editor. In the course of the course we designed and implemented a game. This game was intended to be a multi-platform game that would run on Android and iOS as well as on PC. Moreover, we implemented a trailer for the game. The game will also be published in the net for open distribution for free. It was more a portfolio game for us than a commercial one.<br><br><In the game there is a Phorm called character trying to escape from a laboratory that is built inside a cave. The Phorm was born when a mad scientist moved the soul of the character to a gelatinous blob that has incredible abilities and can change between three states of matter, solid, jelly and gas at will. The game is puzzle based 2D game.<br><br>During the game project I learned how it is like to be in a larger game project and co-operate with your team-mates. This module gave me a better view of game design and production. It also improved my co-operation and English skills while some students were not able to speak Finnish. This project was also about learning from mistakes so that we won\'t make them again. The game was created using Lua and game engine called MOAI. ',
                'This project was a game that me and my friend implemented for a virtual reality environment in Aalto University course Virtual Reality spring 2013. The project was implemented with free Unity 3D and we utilized RUIS for Unity that provided us easy access to Kinect controlled skeletons and Playstation Move. Moreover, it allowed stereoscopic image with passive classes. Programming language used in the project was C#.<br><br>The game itself is a multiplayer game created with a sense of humor where one player acts as a Kinect controlled soldier shooting with a rapid fire bazooka on the back part of a pickup. The other player controls the pickup with Playstation controller. Enemies are mainly tanks but there are also choppers that drop parachutists as reinforcements. The goal in the game is to destroy the main enemy base with dynamites that can be found in the scene. The player can be promoted up to Colonel in the course of the game based on the points.<br><br>This project was very useful for learning things required in game development. First, this game was my first a little bit bigger 3D game and it gave me a better view for creating such games. Second, it taught me how to utilize high level game development tools such as Unity. Third, although we found most of the models in the Internet we had to implement our own models because we could not find suitable ones. So I learned also 3D modeling which was awesome with Autodesk 3D Studio Max that is provided for University students for free. For instance, in the image the watch tower and the wire fence are models that I created with Max. ',
                'Hipster Engine is a Point&Click Adventure Game Engine that was implemented by me and two of my student friends in Aalto University C++ course in autumn 2010. We shared the responsibility areas after planning the engine. My role was to implement graphics and interface managers. So I was responsible for input handling and rendering using a C++ library ClanLib .<br><br>I learned to design an engine that is composed of modules. I also improved my graphics skills and learned to use external libraries with C++. ',
                'This work was one of the demos we produced for our customer MultiTouch Oy in Aalto University course Software Development Project I. Demos will be used in exhibitions, where MultiTouch demonstrates their products. Products are multitouch screens that can accept multiple touches simultaneously. I worked on this demo with two other programmers.<br><br>Purpose was to create a fun game suitable for multitouch screens. In the game the purpose is to protect cows from attacking UFOs by throwing rocks that can destroy UFOs. UFOs capture cows by beaming them.<br><br>This project taught me about software engineering in a larger project corresponding real company projects. It also taught me about quality assurance methods and their importance in software production. In additin, it improved my C++ skills and 2D graphics skills. We utilized Box2D library in the demo. ',
                'This was my Bachelor\'s Thesis work. The programming part was optional but I thought that it is easier to understand how to implement IK solver when you implement it yourself. The implementation uses Levenberg-Marquardt algorithm to optimize the error vector, thus directing the end effector to desired location.<br><br>This work made me understand how inverse kinematics works and it can be used to produce animation. It also taught me to use optimization algorithms in code. Kinematic chain has three joints. Work was implemented in C++ using Eigen library.',
                'This work introduced me with raytracing. It was project work on Aalto University course Advanced Course on Interactive Computer Graphics in spring 2011. Game was made using SDL and C++.<br><br>Our task was to implement different kinds of abilities to the raytracer. In the picture there is for example a mirror. ',
                'In this work I learned about OpenGL, its pipeline and the shader system. We used GLSL to implement different shaders like toonshader and directional light.<br><br>Keys for the application are following: F1 - Directional light, F2 - Toon shader, F3 - Procedural Shader (Fractal), F4 - Simple Multitexturing, F5 - Point light, F6 - Simple animation (beating bunny), F7 - Spotlight, F8 - Simple Bump mapping specular shader. Moreover, one can move in the scene with mouse and arrow keys. The texture mapping is a simple projection to xy - plane (x,y) -> (s,t), Textures used in the model are 256x256 size.<br><br>Work was implemented in C++ using OpenGL and GLM library. Work was project on Aalto University course Advanced course in Interactive Computer Graphics in spring 2011. ',
                'As a hobby I was curious to test cloth simulation with simple damper spring mass model and noticed what is said about the model, ie the cloth stretches too much. The model was implemented in the summer 2012. I used C++ and OpenGL for the project. ',
                'This work was about producing different kinds of plants with L-systems. This was quite interesting work. Purpose was to make plants grow and look natural.<br><br>Work was implemented by using Processing and Java. School project on a self-study Computer Animation course in Aalto University in fall 2011.',
                'This work was about deformation. Purpose was to implement a dynamic body, a pipe that deforms according to balls that it shoots.<br><br>Work was implemented by using Processing and Java. Work on Computer Animation course in fall 2011.',
                'This work taught me how to use particle systems to produce special effects. How to make particles move along fields. For the fields we used sinks, sources, vortices and linear fields.<br><br>Work was implemented by using Processing and Java. Work on Computer Animation course in fall 2011.',
                'This was my first 3D game. It introduced me with 3D graphics and matrix stack. It was project work on Aalto University course Interactive Computer Graphics in fall 2010. Game was made by Processing and Java.<br><br>Game is a labyrinth where you can control the ball by moving the labyrinth to different orientations. Purpose is to get to the goal and beware the holes. ',
                ' This was my first graphical work. It made me interested in graphics. My first work that included some kind of game logic. In this project I learned to design and implement a software from scratch.<br><br>The work was project work on TKK Java programming course. Implemented in Java using Swing library.',
                'This work was my own hobby in the beginning of the studies. It was implemented in Java. It taught me about 2D graphics, game design, game programming and concurrent programming. I learned that one should not use too many threads in an application because the context switch between the threads takes too much. Moreover, I faced a problem called ConcurrentModificationException as multiple threads tried to access arrays simultaneously.'
            ];

            const imagePath = 'project_pics/';

            const images: string[] = [
                'starbase.png',
                'mooncat_riddle.png',
                'webgl.png',
                'balloonboy.png',
                'best.png',
                'wreckfest.png',
                'wordmanip.png',
                'wheelie.png',
                'pbr.png',
                'escape.bmp',
                'whatthefish.png',
                'bittetris.png',
                'betting.png',
                'phorm.png',
                'tankbasterds.png',
                'hipsterlogo.png',
                'rockthrowing.png',
                'ik.png',
                'raytracer.png',
                'stanfordbunny.png',
                'cloth.png',
                'plant.png',
                'FFD.png',
                'particle.png',
                'pallolabyrintti.png',
                'kasino.png',
                'mooncat.png'
            ];

            const buttonsDiv = $('<div></div>', {
                id: 'portfolio-buttons-div'
             });

             $('#portfolio').empty();
             $('#portfolio').html('My Portfolio');


          //   $('#content').addClass('content-portfolio');
           //  $('#content').removeClass('content');

             this.desc = $('<div></div>');
             this.desc.addClass('description');
             $('#portfolio').append(this.desc);

             $('#portfolio').append(buttonsDiv);
             $(buttonsDiv).addClass('portfolio-buttons-list');

             const ul = $('<ul/>');
             $(buttonsDiv).append(ul);

            for(let i = 0; i < projectNames.length; i++) {
                const projectName = projectNames[i];

                const li = $('<li/>'); 
                $(ul).append(li);  

              const button = $('<button/>', {
                   text: projectName,
                   id: 'btn_'+i,
                   click:  async () => {      
                    this.textureChanged = true;      
                      this.desc.html(`<p class="gradient-text">${descs[i]}</p>`); 

                        this.currentTexture = `${imagePath}/${images[i]}`;
                        const projectPic = PIXI.Sprite.from(this.currentTexture);
                        if(!this.projectPic) {
                            this.projectPic = projectPic;
                            this.stage.addChild(this.projectPic);

                        } else {
                            this.projectPic.texture = projectPic.texture;
                            this.projectPic.texture.baseTexture.update();
                            this.textureChanged = true;  
                            await wait(50); 
                        }
                        const apsectRatio = this.projectPic.texture.baseTexture.width / this.projectPic.texture.baseTexture.height;
                        if(Number.isNaN(apsectRatio)) {
                            $('#content').addClass('content-portfolio');
                            this.projectPic.width  = 600;
                            return;
                        }
                        this.projectPic.width = 600;
                        this.projectPic.height = 600 / apsectRatio;
                        this.projectPic.anchor.set(0.5, 0.5);
                        if(!this.projectAnimationIsRunning) {
                            this.animateSprite();
                            this.projectAnimationIsRunning = true;
                        }

                        this.textureChanged = true;
                        $('#content').addClass('content-portfolio');
                     }

               });

               $(button).addClass('gradient-text');
               $(button).addClass('portfolio-button');
               $(button).html(`• [${i + 1}] ${projectName}`);
               li.append(button);
            }
        });

        this.cvLink = $('#cv-link').get(0);

        this.canvas = $('#canvas').get(0) as HTMLCanvasElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.canvas.addEventListener('mousemove', (event) => {
            const x = event.x;
            const y = event.y;
            const cvLinkbox = this.cvLink.getBoundingClientRect();
            if(cvLinkbox.left <= x && cvLinkbox.right >= x &&
                cvLinkbox.top <= y && cvLinkbox.bottom >= y) {
                    if(!this.hover) {
                        this.cvLink.classList.add('hover');
                        this.hover = true;
                    }
                } else {
                    if(this.hover) {
                        this.cvLink.classList.remove('hover');
                        this.hover = false;
                    }
                }
        });

        this.renderer = PIXI.autoDetectRenderer({
            backgroundAlpha: 0,
            clearBeforeRender: true,
            view: this.canvas,
            width: window.innerWidth,
            height: window.innerHeight
         });

         const style = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAlpha: 0.26,
            dropShadowAngle: 0.57,
            dropShadowBlur: 2,
            dropShadowColor: "#7c6d38",
            dropShadowDistance: 10,
            fill: "#d5ae74",
            fontFamily: "Helvetica",
            fontSize: 22,
            fontWeight: "bold",
            stroke: "#634930",
            strokeThickness: 5
        });

        this.stage = new PIXI.Container();

        this.text = new PIXI.Text('DirectX 12 Ultimate', style);
        this.stage.addChild(this.text);

        this.time = 0; 
        this.startTime = -1;

        this.texts = [
            'DirectX 12 Ultimate',
            'Vulkan',
            'Unreal Engine 5',
            'Unity3D',
            'PIXI.js',
            'Three.js',
            'OpenGL',
            'C++',
            'C',
            'TypeScript',
            'HLSL',
            'GLSL',
            'Raytracing'
        ];

         const update = () => {

            let updateTextureTime = -1;
            requestAnimationFrame(update);
            this.animateTexts();
            this.renderer.render(this.stage);
            this.time += 1/60;

            if(this.textureChanged && this.projectPic) {
                const texture = PIXI.Texture.from(this.currentTexture);
                this.projectPic.texture = texture;

                this.stage.removeChild(this.projectPic);
                this.stage.addChild(this.projectPic);
                this.textureChanged = false;

                updateTextureTime = this.time + 1;
            }

            if(updateTextureTime > 0) {
                const texture = PIXI.Texture.from(this.currentTexture);
                this.projectPic.texture = texture;
                updateTextureTime = -1;
            }
         };

         requestAnimationFrame(update);
    }

    async animateSprite() {
        this.stopAnimation = false;
        if(this.projectPic) {
            const centerX = this.canvas.width * 0.5;
            const centerY = this.canvas.height * 0.5;

            while(true) {

                let time = 0;
                let duration = 3 + 3 * Math.random();
                let speed =  0.5 + 0.4 * Math.random();
                let offsetX = -100 +  200 * Math.random();
                let offsetY = -50 + 150 * Math.random();
                let offsetXEnd = -100 +  200 * Math.random();
                let offsetYEnd = -50 + 150 * Math.random();

                while(time < duration) {

            /*     if(this.textureChanged) {
                    const texture = PIXI.Texture.from(this.currentTexture);
                    this.projectPic.texture = texture;
                    this.textureChanged = false;
                    }*/

                    this.projectPic.x = GUI.lerp(centerX + offsetX, centerX + offsetXEnd, GUI.clamp(0, 1, speed * time / duration));
                    this.projectPic.y = GUI.lerp(centerY + 200 + offsetY, centerY + offsetYEnd + 200, GUI.clamp(0, 1, speed * time / duration));
                    if(time < duration * 0.33) {
                        this.projectPic.alpha = GUI.clamp(0, 0.9, GUI.lerp(0, 0.9, speed * time / (duration * 0.33)));
                    } else if(time >= duration * 0.33 && time < duration * 0.66) {
                        this.projectPic.alpha = 1;
                    } else {
                        this.projectPic.alpha = GUI.clamp(0, 0.9, GUI.lerp(0.9, 0, speed * (time - 0.5 * duration) / (duration * 0.33)));
                    }
                 await wait(1000/60);

                   /* if(this.stopAnimation) {
                        return;
                    }*/

                    time += 1/60;
                }
                
            /*    if(this.stopAnimation) {
                    return;
                }*/
            }
        }
    }

    private createTableHeader(parentId: string, texts: string[]) {
        let i = 1;
        for(let text of texts) {
            this.createElement('th', parentId, text, ['cell100', `column${i}`]).innerHTML = text;
            i++;
        }
    }

    public createElement(elementType: string, parentId: string, id: string, classes: string[]) {
        const element = document.createElement(elementType)
        element.setAttribute('id', id);
        for(let c of classes) {
            $(element).addClass(c);
        }
        $(`#${parentId}`).append(element);

        return element;
    }

    public clearTable() {
    //    $(`#${this.tableBody.id}`).empty();
    }

    public addEntry(weightEntry: WeightResult) {
        let i = 1;
        const row = this.createElement('tr', this.tableBody.id, `row${weightEntry.id}`, ['row100', 'body']);
        const order = ['date', 'weight', 'edit', 'remove'];
        for(let key of order) {
            let classes = ['cell100'];
            const value = weightEntry[key];
            let stringValue = '';
            if(key === 'id') {
                continue;
            }
            else {
                if(value instanceof Date) {
                    stringValue = `${value.getDate()}.${value.getMonth() + 1}.${value.getFullYear()}`;
                } else {
                    stringValue = `${value}`;

                }
            }

            classes.push(`column${i}`);
            if(key === 'edit') {
                this.createElement('td', row.id, `${key}${weightEntry.id}`, classes).innerHTML = `<button onclick="main.openEditWindow(${weightEntry.id})">&#9998;</button>`;
            }
            else if(key === 'remove') {
                this.createElement('td', row.id, `${key}${weightEntry.id}`, classes).innerHTML = `<button onclick="main.openConfirmRemoveWindow(${weightEntry.id})">&#10006;</button>`; 
            }
            else {
                this.createElement('td', row.id, `${key}${weightEntry.id}`, classes).innerHTML = stringValue;
            }
            i++;
        }
    }

    public openEditWindow(id: number) {
        $('#edit-popup').fadeIn();
        $('#weight-edit').val(Number($(`#weight${id}`).html()));
        this.selectedRow = id;
    }

    public openConfirmRemoveWindow(id: number) {
        this.selectedRow = id;
        $('#remove-popup').fadeIn();
    }

    public closeConfirmRemoveWindow() {
        $('#remove-popup').fadeOut();
    }

    public getUpdatedResult() {
        const weightResult: WeightResult = {
            weight: Number($('#weight-edit').val()),
            id: this.selectedRow,
            password: ''
        };
        return weightResult;
    }

    public closeEditWindow() {
        $('#edit-popup').fadeOut();
    }

    public getWeightFromInput() {
        const weight = $('#weight-input').val() as number;
        return weight;
    }

    public resetFields() {
        $('#weight-input').val(0);
    }

    public getPasswordFromField() {
        return $('#pw-field').val() as string;
    }

    private animateTexts() {

        if((this.time - this.startTime > this.alphaDuration * 2 + this.stayVisibleTime || this.startTime === -1) && this.state === 'fade-out') {
            this.state = 'fade-in';
            this.time = 0;
            this.text.alpha = 0;
            this.alphaDuration = Math.random() * 3.0 + 1.0;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            this.text.x = x;
            this.text.y = y;
            this.startTime = 1.0;

            const scale = Math.random() * 1;
            this.text.scale.set(scale);

            const scaleFactor = Math.random() * 0.1;
            this.textVelocity = { x: Math.random() * 5, y: Math.random() * 5 };
            this.scaleVelocity = { x: scaleFactor, y: scaleFactor };

            const index = Math.floor(Math.random() * this.texts.length);

            this.text.text = this.texts[index];
        }

        const t = GUI.clamp(0, 1, (this.time - this.startTime) / this.alphaDuration);
        this.text.alpha = GUI.lerp(0, 1, GUI.easeInOutCubic(t));

        if(this.time - this.startTime > this.alphaDuration + this.stayVisibleTime && this.state === 'fade-in') {
            this.state = 'fade-out';
            this.time = this.startTime;
        }

        if(this.state === 'fade-out') {
            const t = GUI.clamp(0, 1, (1 - (this.time - this.startTime) / this.alphaDuration));
            this.text.alpha = GUI.lerp(0, 1, GUI.easeInOutCubic(t));
        }

        this.text.x += this.textVelocity.x * 1/60;
        this.text.y += this.textVelocity.y * 1/60;
        this.text.scale.x += this.scaleVelocity.x * 1/60;
        this.text.scale.y += this.scaleVelocity.y * 1/60;

    }

    static easeInOutCubic(x: number) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    static lerp(start: number, end: number, t: number) {
        return start * (1 - t) + t * end;
    }

    static clamp(min: number, max: number, value: number) {
        if(value < min) return min;
        if(value > max) return max;
        return value;
    }

    tableBody: HTMLElement;

    selectedRow: number;

    canvas: HTMLCanvasElement;
    renderer: PIXI.AbstractRenderer;
    stage: PIXI.Container;

    text: PIXI.Text;

    time: number;
    startTime: number;
    stayVisibleTime: number = 4.0;
    alphaDuration: number;

    state: 'fade-in' | 'fade-out' = 'fade-out';

    texts: string[];

    textVelocity: { x: number, y: number };
    scaleVelocity: { x: number, y: number };

    cvLink: HTMLElement;

    desc: JQuery<HTMLElement>;

    projectPic: PIXI.Sprite = null;

    hover: boolean = false;

    stopAnimation = false;
    projectAnimationIsRunning: boolean = false;

    currentTexture: string;
    textureChanged = false;
}