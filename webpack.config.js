const path = require('path');

module.exports = {  

    entry: "./src/client/main.ts",  
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {    
        filename: "bundle.js",
        libraryTarget: 'var',
        library: 'main'  
    },  
    mode: "production",  
    node: false,  
    module: {    
        rules: [      
            {        
                test: /\.m?ts$/,
  /*              exclude: [
                    path.resolve(__dirname, "src/server")
                  ],
                  include: [
                      path.resolve(__dirname, "src/server/data"),
                      path.resolve(__dirname, 'src/server/data')
                  ],       */
                use: {          
                    loader: "babel-loader",         
                    options: {            
                        presets: ["@babel/preset-env",
                                   "@babel/preset-typescript"
                                 ], // ensure compatibility with older browsers            
                        plugins: ["@babel/plugin-transform-object-assign",                 
                                    ], // ensure compatibility with IE 11          
                    },        
                },      
            },      
            {        
                test: /\.js$/,        
                loader: "webpack-remove-debug", // remove "debug" package      
            },    
        ],  
    },
}; 
