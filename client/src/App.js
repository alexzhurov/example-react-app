"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./App.css");
class App extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            response: '',
            post: '',
            responseToPost: ''
        };
        this.callApi = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('/api/hello');
            const body = yield response.json();
            if (response.status !== 200)
                throw Error(body.message);
            return body;
        });
        // handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        this.handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
            // handleSubmit = async (e: MouseEvent) => {
            e.preventDefault();
            const response = yield fetch('/api/world', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ post: this.state.post })
            });
            const body = yield response.text();
            this.setState({ responseToPost: body });
        });
    }
    componentDidMount() {
        this.callApi()
            .then((res) => this.setState({ response: res.express }))
            .catch((err) => console.log(err));
    }
    render() {
        return (<div className="App">
                <p>{this.state.response}</p>

                <form onSubmit={this.handleSubmit}>
                    <p>
                        <strong>Post to Server:</strong>
                    </p>
                    <input type="text" value={this.state.post} onChange={(e) => this.setState({ post: e.target.value })}/>
                    <button type="submit">Submit</button>
                </form>

                <p>{this.state.responseToPost}</p>
            </div>);
    }
}
exports.default = App;
