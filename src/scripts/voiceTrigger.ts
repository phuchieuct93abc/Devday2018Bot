export default new class VoiceTrigger {
    agent: any;
    domHelper: any;
    setAgent(agent: any) {
        this.agent = agent;
        this.domHelper = agent.domHelper;
    }
    trigger(content) {
        this.stopRecognize();
        this.domHelper.setInputValue(content);
        this.agent.handleInput();
        this.startRecognize();

    }
    private startRecognize() {
        this.agent.isRecognizing = false;
        this.domHelper.handleStopRecognition();
    }
    private stopRecognize() {
        setTimeout(() => {
            this.domHelper.handleStartRecognition();
            this.agent.isRecognizing = true;
        }, 2000)
    }
}
