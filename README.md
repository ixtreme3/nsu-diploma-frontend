# Bachelor's Degree Thesis Demo Repository
This repository contains the code for a visual demonstration of a sample usage scenario of the semantic model developed as part of my bachelor's degree thesis project. The project aimed to develop an innovative information system to assist individuals in navigating unfamiliar organizations by providing answers to queries about their internal structure and processes.

![Alt text](<Demonstration screens/main-page-big.png>)

# Project Overview
The core of this project is a generic semantic model, implemented as a knowledge graph, that can represent various organizations. The knowledge graph serves as the foundation for the information system and enables the illustration and exploration of organizational structures and processes.

# Key Features
* Ontology-based representation of organizational knowledge.
* Implementation of a server-side application using Python, RDFLib, and Flask.
* Development of a client-side application using HTML, CSS, and JavaScript.
* Integration of the server and client components to enable interaction with the knowledge graph.

# Thesis Work
The development of the semantic model and its implementation in this project formed a significant part of my bachelor's degree thesis. I successfully defended my thesis with distinction, demonstrating a deep understanding of the subject matter and the ability to apply it practically.

# Usage Instructions
To run the demonstration, follow these steps:

1. Clone this repository to your local machine.
2. Set up and configure the server-side application by opening restAPI.py in a suitable integrated development environment (e.g., PyCharm). Install any required dependencies.
3. In restAPI.py, specify the absolute path to the ontology file in line 8 (g.parse('absolute_path_to_ontology_file')).
4. Start the server-side application by running restAPI.py.
5. Navigate to the "Frontend" folder and open index.html in a web browser to access the client-side application.
6. Explore the demonstration, interact with the visual representation of the knowledge graph, and observe the functionality of the information system.
