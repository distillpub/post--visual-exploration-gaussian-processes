# A Visual Exploration of Gaussian Processes

The online version of this article lives at: https://www.jgoertler.com/visual-exploration-gaussian-processes

## Abstract

Gaussian processes are a powerful tool in the machine learning toolbox.
They allow us to make predictions about our data based on prior knowledge.
Their most obvious area of application are regression problems, for example in robotics, but they can also be extended to classification and clustering tasks.
The goal of regression is to find a function that describes a given set of data points as closely as possible.
This process is called fitting a function to the data.
For a given set of training points, there are potentially infinitely many functions that fit the data.
Gaussian processes offer an elegant solution to this problem by assigning a probability to each of these functions.
The mean of this probability distribution then represents the most probable characterization of the data.
Furthermore, using a probabilistic approach allows us to incorporate the confidence of the prediction into the regression result. 
With this article, we want to give an introduction to Gaussian processes and make the mathematical intuition behind them more approachable using interactive figures and hands-on examples.


