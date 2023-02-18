import {FormEvent, useState} from "react";
import {Radio} from "@nextui-org/react";

type Props = {
  generateCron: (prompt: string, currentAuthor: string) => void;
  result?: string;
  author?: string;
  loading: boolean;
};

export default function Form({generateCron, result, loading}: Props) {
  const [copied, setCopied] = useState(false);
  let [radioValue, setRadioValue] = useState('李白');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      prompt: { value: string };
    };
    const prompt = target.prompt.value;
    if (prompt == "") {
      console.log("log...prompt is '',")
      return
    }
    generateCron(prompt, radioValue);
  };

  const handleCopy = () => {
    setCopied(true);
    if (result) navigator.clipboard.writeText(result);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleAuthor = (value: string) => {
    setRadioValue(value)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6">
        <input
          name="prompt"
          type="text"
          value="傍晚我出去吃饭，回来的时遇到了小明，我们交谈了好久"
          className="w-full rounded-md bg-neutral-800 px-2 py-5 outline-none"
          autoFocus
        />
        <h2 className="pb-3 text-xl">选择不同风格的人物</h2>
        <Radio.Group defaultValue="李白" orientation="horizontal"
                     onChange={handleAuthor}
                     className="pb-3 text-xl bg-gray-700"
                     labelColor="primary"
        >
          <Radio value="李白" color="warning" labelColor="warning" size={"xl"}>
            李白
          </Radio>
          <Radio value="王家卫" color="primary" labelColor="primary" size={"xl"}>
            王家卫
          </Radio>
          <Radio value="古龙" color="secondary" labelColor="secondary" size={"xl"}
                 style={{backgroundColor: 'white'}}>
            古龙
          </Radio>
          <Radio value="李逵" color="success" labelColor="success" size={"xl"}>
            李逵
          </Radio>
        </Radio.Group>
        <button
          disabled={loading}
          type="submit"
          className="mt-4 w-full rounded-md bg-neutral-700 px-8 py-2.5 text-base  text-white hover:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          点击这里
        </button>
        {result && (
          <div
            className="flex items-center rounded-md bg-neutral-800 px-2 py-5">
            <div className="flex-1">
              <p className="text-xl">{result}</p>
            </div>
            <div>
              {!copied && (
                <div className="cursor-pointer text-sm" onClick={handleCopy}>
                  Copy
                </div>
              )}
              {copied ? (
                <div>
                  <p className="ml-2 text-sm text-green-600">Copied</p>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
