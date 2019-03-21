$(document).ready(function () {
  var bubbleChart = new d3.svg.BubbleChart({
    supportResponsive: true,
    //container: => use @default
    size: 1400,
    //viewBoxSize: => use @default
    innerRadius: 700 / 2.5,
    //outerRadius: => use @default
    radiusMin: 60,
    //radiusMax: use @default
    //intersectDelta: use @default
    //intersectInc: use @default
    //circleColor: use @default
    data: {
      items: [
      
          {
            breed: "Domestic Longhair Mix",
            animal: "Cat",
            count: 1228
          },
          {
            breed: "Domestic Medium Hair Mix",
            animal: "Cat",
            count: 2323
          },
          {
            breed: "Domestic Shorthair",
            animal: "Cat",
            count: 386
          },
          // {
          //   breed: "Domestic Shorthair Mix",
          //   animal: "Cat",
          //   count: 23335
          // },
          {
            breed: "Siamese Mix",
            animal: "Cat",
            count: 998
          },
          {
            breed: "Beagle Mix",
            animal: "Dog",
            count: 384
          },
          {
            breed: "Border Collie Mix",
            animal: "Dog",
            count: 646
          },
          {
            breed: "Boxer Mix",
            animal: "Dog",
            count: 674
          },
          {
            breed: "Cairn Terrier Mix",
            animal: "Dog",
            count: 330
          },
          {
            breed: "Catahoula Mix",
            animal: "Dog",
            count: 476
          },
          // {
          //   breed: "Chihuahua Longhair Mix",
          //   animal: "Dog",
          //   count: 359
          // },
          // {
          //   breed: "Chihuahua Shorthair Mix",
          //   animal: "Dog",
          //   count: 4733
          // },
          // {
          //   breed: "Dachshund Mix",
          //   animal: "Dog",
          //   count: 798
          // },
          // {
          //   breed: "German Shepherd Mix",
          //   animal: "Dog",
          //   count: 1892
          // },
          // {
          //   breed: "Great Pyrenees Mix",
          //   animal: "Dog",
          //   count: 330
          // },
          // {
          //   breed: "Jack Russell Terrier Mix",
          //   animal: "Dog",
          //   count: 416
          // },
          // {
          //   breed: "Labrador Retriever Mix",
          //   animal: "Dog",
          //   count: 4608
          // },
          {
            breed: "Miniature Poodle Mix",
            animal: "Dog",
            count: 648
          },
          {
            breed: "Miniature Schnauzer Mix",
            animal: "Dog",
            count: 392
          },
          // {
          //   breed: "Pit Bull Mix",
          //   animal: "Dog",
          //   count: 6135
          // },
          {
            breed: "Pointer Mix",
            animal: "Dog",
            count: 325
          },
          {
            breed: "Rat Terrier Mix",
            animal: "Dog",
            count: 456
          },
          {
            breed: "Rottweiler Mix",
            animal: "Dog",
            count: 321
          },
          {
            breed: "Siberian Husky Mix",
            animal: "Dog",
            count: 418
          },
          {
            breed: "Staffordshire Mix",
            animal: "Dog",
            count: 350
          },
          {
            breed: "Yorkshire Terrier Mix",
            animal: "Dog",
            count: 437
          },
          // {
          //   breed: "Bat",
          //   animal: "Other",
          //   count: 799
          // },
          // {
          //   breed: "Bat Mix",
          //   animal: "Other",
          //   count: 1286
          // },
          {
            breed: "Raccoon Mix",
            animal: "Other",
            count: 465
          },
         
        
          // {
          // //   breed: "Domestic Longhair Mix",
          // //   animal: "Cat",
          // //   count: 1228
          // // },
          {
            breed: "Domestic Medium Hair Mix",
            animal: "Cat",
            count: 2323
          },
          {
            breed: "Domestic Shorthair Mix",
            animal: "Cat",
            count: 23335
          },
          {
            breed: "Siamese Mix",
            animal: "Cat",
            count: 998
          },
          {
            breed: "Australian Cattle Dog Mix",
            animal: "Dog",
            count: 1059
          },
          {
            breed: "Border Collie Mix",
            animal: "Dog",
            count: 646
          },
          {
            breed: "Boxer Mix",
            animal: "Dog",
            count: 674
          },
          {
            breed: "Chihuahua Shorthair Mix",
            animal: "Dog",
            count: 4733
          },
          {
            breed: "Dachshund Mix",
            animal: "Dog",
            count: 798
          },
          {
            breed: "German Shepherd Mix",
            animal: "Dog",
            count: 1892
          },
          {
            breed: "Labrador Retriever Mix",
            animal: "Dog",
            count: 4608
          },
          {
            breed: "Miniature Poodle Mix",
            animal: "Dog",
            count: 648
          },
          {
            breed: "Pit Bull Mix",
            animal: "Dog",
            count: 6135
          },
          {
            breed: "Bat",
            animal: "Other",
            count: 799
          },
          {
            breed: "Bat Mix",
            animal: "Other",
            count: 1286
          }
         
      ],
      eval: function (item) {return item.count;},
      classed: function (item) {return item.breed.split(" ").join("");},
      classed: function (item) {return item.animal;}
    },
    plugins: [
      // {
      //   name: "central-click",
      //   options: {
      //     text: "(See more detail)",
      //     style: {
      //       "font-size": "12px",
      //       "font-style": "italic",
      //       "font-family": "Source Sans Pro, sans-serif",
      //       //"font-weight": "700",
      //       "text-anchor": "middle",
      //       "fill": "white"
      //     },
      //     attr: {dy: "65px"},
      //     centralClick: function() {
      //       alert("Here is more details!!");
      //     }
      //   }
      // },
              {
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "count",
              classed: {count: true},
              style: {
                "font-size": "15px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "-20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #1
              textField: "breed",
              classed: {breed: true},
              style: {
                "font-size": "10px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #2
              textField: "animal",
              classed: {animal: true},
              style: {
                "font-size": "15px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            }
          ],
          centralFormat: [
            {// Line #0
              style: {"font-size": "50px"},
              attr: {}
            },
            {// Line #1
              style: {"font-size": "40px"},
              attr: {dy: "25px"}
            },
            {// Line #2
              style: {"font-size": "40px"},
              attr: {dy: "70px"}
            }

          ]
        }
      }]
  });
});