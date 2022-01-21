import { readFileSync } from 'fs';

const metadata = [
  {
    name: 'Compsognathus',
    description: "Carnivore (meat-eater) - Compsognathus caught and ate small animals, including insects and lizards. John Ostrom found fossilized remains from a Compsognathus' stomach that contained the skeleton of the fast-running lizard Bavarisaurus.",
    image: readFileSync('scripts/assets/1.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "lizard-hipped dinosaurs"
      },
      {
        "trait_type": "Suborder",
        "value": "bipedal carnivores"
      },
      {
        "trait_type": "Length",
        "value": 28
      },
      {
        "trait_type": "height",
        "value": 10
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 6.5
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": -3502809748000
      }
    ],
  },
  {
    name: 'Dryosaurus',
    description: 'Herbivore (plant-eater) - Dryosaurus probably ate conifers, cycads, and ginkgos.',
    image: readFileSync('scripts/assets/2.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "beaked, bird-hipped dinosaurs that were plant-eaters"
      },
      {
        "trait_type": "Suborder",
        "value": "Ornithopoda"
      },
      {
        "trait_type": "Length",
        "value": 10
      },
      {
        "trait_type": "height",
        "value": 5
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 90
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": -2398272148000
      }
    ],
  },
  {
    name: 'Eustreptospondylus',
    description: 'Carnivore (meat-eater)',
    image: readFileSync('scripts/assets/3.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "lizard-hipped dinosaurs"
      },
      {
        "trait_type": "Suborder",
        "value": "bipedal carnivores"
      },
      {
        "trait_type": "Length",
        "value": 30
      },
      {
        "trait_type": "height",
        "value": 12
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 250
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": -189370800000
      }
    ],
  },
  {
    name: 'Metriacanthosaurus',
    description: 'Carnivore (meat-eater)',
    image: readFileSync('scripts/assets/4.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "lizard-hipped dinosaurs"
      },
      {
        "trait_type": "Suborder",
        "value": "bipedal carnivores"
      },
      {
        "trait_type": "Length",
        "value": 26
      },
      {
        "trait_type": "height",
        "value": 6
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 300
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": -189370800000
      }
    ],
  },
  {
    name: 'Zuniceratops',
    description: 'Herbivore (plant-eater)',
    image: readFileSync('scripts/assets/5.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "bird-hipped dinosaurs (plant-eaters)"
      },
      {
        "trait_type": "Suborder",
        "value": "Marginocephalia"
      },
      {
        "trait_type": "Length",
        "value": 11
      },
      {
        "trait_type": "height",
        "value": 3.3
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 250
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": 883630800000
      }
    ],
  },
  {
    name: 'Sinornithoides',
    description: 'Omnivore (it ate meat and plants, including mammals, smaller dinosaurs, insects, and some plant material)',
    image: readFileSync('scripts/assets/6.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "lizard-hipped dinosaurs"
      },
      {
        "trait_type": "Suborder",
        "value": "bipedal carnivores"
      },
      {
        "trait_type": "Length",
        "value": 3.6
      },
      {
        "trait_type": "height",
        "value": 1.5
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 5.5
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": 757400400000
      }
    ],
  },
  {
    name: 'Parksosaurus',
    description: 'Herbivore (plant-eater)',
    image: readFileSync('scripts/assets/7.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "beaked, bird-hipped dinosaurs that were plant-eaters"
      },
      {
        "trait_type": "Suborder",
        "value": "Ornithopoda"
      },
      {
        "trait_type": "Length",
        "value": 7
      },
      {
        "trait_type": "height",
        "value": -1
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 70
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": -1041361200000
      }
    ],
  },
  {
    name: 'Jaxartosaurus',
    description: 'Herbivore (plant-eater)',
    image: readFileSync('scripts/assets/8.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "beaked, bird-hipped dinosaurs that were plant-eaters"
      },
      {
        "trait_type": "Suborder",
        "value": "Ornithopoda"
      },
      {
        "trait_type": "Length",
        "value": 0.9
      },
      {
        "trait_type": "height",
        "value": -1
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": -1
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": -1136055600000
      }
    ],
  },
  {
    name: 'Allosaurus',
    description: 'Carnivore (meat-eater)- it ate plant-eating dinosaurs, like stegosaurs and iguanodonts.',
    image: readFileSync('scripts/assets/9.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "lizard-hipped dinosaurs"
      },
      {
        "trait_type": "Suborder",
        "value": "bipedal carnivores"
      },
      {
        "trait_type": "Length",
        "value": 40
      },
      {
        "trait_type": "height",
        "value": 10
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 450
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": -2934729748000
      }
    ],
  },
  {
    name: 'Gorgosaurus',
    description: 'Carnivore (meat-eater) - it ate plant-eating dinosaurs like Lambeosaurus, Centrosaurus, Corythosaurus, Edmontonia, Euoplocephalus, and Styracosaurus',
    image: readFileSync('scripts/assets/10.jpg'),
    properties: [
      {
        "trait_type": "Order",
        "value": "lizard-hipped dinosaurs"
      },
      {
        "trait_type": "Suborder",
        "value": "bipedal carnivores"
      },
      {
        "trait_type": "Length",
        "value": 30
      },
      {
        "trait_type": "height",
        "value": 9.3
      },
      {
        "display_type": "boost_number",
        "trait_type": "weight",
        "value": 250
      },
      {
        "display_type": "date",
        "trait_type": "named",
        "value": -1767207600000
      }
    ],
  },
];

export default metadata;
