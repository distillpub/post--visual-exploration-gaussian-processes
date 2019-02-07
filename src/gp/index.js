import * as gauss from '../gaussian';
import * as m from 'ml-matrix';

export function rbf(sigma = 1, l = 1) {
  const ss2 = 2 * l * l;
  return (x1, x2) => {
    const sqdist = Math.pow(x1-x2,2);
    return sigma * sigma * Math.exp(-sqdist / ss2);
  };
}

export function periodic(sigma = 1, l = 1.4, p = 2) {
  const l2 = l * l;
  return (x1, x2) => {
    const dist = Math.abs(x1-x2,2);
    const sin2 = Math.pow(Math.sin((Math.PI * dist/ p)),2);
    return sigma*sigma*Math.exp(-(2*sin2)/l2);
  };
}

export function linear(sigma = 1, sigmaB = 0, c = 0) {
  return (x1, x2) => {
    return sigmaB + sigma * sigma * (x1 - c) * (x2 - c);
  };
}

export function combineKernelsMultiplication(kernels) {
  return (x1, x2) => {
    const results = kernels.map(k => k.apply(null, [x1, x2]));
    return results.reduce((acc, x) => acc * x, 1);
  };
}

export function combineKernelsAddition(kernels) {
  return (x1, x2) => {
    const results = kernels.map(k => k.apply(null, [x1, x2]));
    return results.reduce((acc, x) => acc + x, 1);
  };
}


export function covMatrix(v, kernel) {
  const dim = v.length;
  const kernelMatrix = new m.Matrix(dim, dim);
  for(let i = 0; i < dim; ++i) {
    for(let j = i; j < dim; ++j) {
      kernelMatrix[i][j] = kernelMatrix[j][i] = kernel(v[i], v[j]); 
    }
  }
  return kernelMatrix;
}

// xtrain and ytrain can be omitted to obtain the prior distribution
export function gaussianProcess(kernel, xtest, xtrain, ytrain) {
  if(xtrain == undefined && ytrain == undefined) xtrain = [];
  const xs = xtrain.concat(xtest);
  const cov = covMatrix(xs, kernel);
  const eps = m.Matrix.eye(xs.length).mul(1e-6);
  cov.add(eps);
  const mean = m.Matrix.zeros(xs.length, 1); // TODO: Currently assumes zero mean
  const gp = new gauss.Gaussian(mean, cov);
  return (xs.length == xtest.length ? gp : gp.condition(ytrain));
}
