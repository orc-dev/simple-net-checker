export default class CubeNet {

    constructor(
        isValidCubeNet = undefined,
        baseMatrix = undefined,
        flip = false,  // flip about y axis
        rotationNum = 0,
    ) {
        this.isValidCubeNet = isValidCubeNet;
        this.baseMatrix = baseMatrix;
        this.flip = flip;
        this.rotationNum = rotationNum;
        this.outputMat = Array.from({ length: 8 }, () => Array(8).fill(0));
        this.#computeOutputMatrix();
    }

    #computeOutputMatrix() {
        let tempMatrix = [];

        // handle flip
        for (let i = 0; i < this.baseMatrix.length; ++i) {
            let tempRow = this.baseMatrix[i].slice();
            if (this.flip) tempRow.reverse();
            tempMatrix.push(tempRow);
        }

        // hanlde rotation
        if (this.rotationNum === 0) {
            for (let i = 0; i < 8; ++i) {
                for (let j= 0; j < 8; ++j) {
                    this.outputMat[i][j] = tempMatrix[i][j];
                }
            }
        } else if (this.rotationNum === 1) {
            for (let i = 0; i < 8; ++i) {
                for (let j= 0; j < 8; ++j) {
                    this.outputMat[i][j] = tempMatrix[j][7 - i];
                }
            }
        }
        else if (this.rotationNum === 2) {
            for (let i = 0; i < 8; ++i) {
                for (let j= 0; j < 8; ++j) {
                    this.outputMat[i][j] = tempMatrix[7 - i][7 - j];
                }
            }
        }
        else if (this.rotationNum === 3) {
            for (let i = 0; i < 8; ++i) {
                for (let j= 0; j < 8; ++j) {
                    this.outputMat[i][j] = tempMatrix[7 - j][i];
                }
            }
        }
        else {
            throw new Error(`Invalid roationNum: ${this.rotationNum}`);
        }
    }

    isValid() {
        return this.isValidCubeNet;
    }

    getOutputMatrix() {
        return this.outputMat;
    }
}