import ReactMarkdown from 'react-markdown';
import rehypeFormat from 'rehype-format';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const ErrorContent = ({ content }: { content?: string }) => {
  return (
    <ReactMarkdown
      components={{
        h3: ({ children }) => <h3 className='mb-2 mt-6 text-xl font-bold'>{children}</h3>,
        h4: ({ children }) => <h4 className='mb-2 mt-4 text-lg font-semibold'>{children}</h4>,
        p: ({ children }) => <p className='mb-4'>{children}</p>,
        ul: ({ children }) => <ul className='mb-4 ml-6 list-disc'>{children}</ul>,
        li: ({ children }) => <li className='mb-2'>{children}</li>,
        strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
        em: ({ children }) => <em className='italic'>{children}</em>,
        del: ({ children }) => <del className='line-through'>{children}</del>,
        input: (props) => <input className='rounded border px-2 py-1' {...props} />,
        table: ({ children }) => (
          <div className='mb-4 overflow-x-auto'>
            <table className='min-w-full border-collapse border border-gray-300'>{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className='bg-gray-50 text-center dark:bg-slate-900'>{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr className='border-b border-gray-300'>{children}</tr>,
        th: ({ children }) => (
          <th className='border-r border-gray-300 px-4 py-2 text-center font-semibold'>
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className='border-r border-gray-300 px-4 py-2 text-center'>{children}</td>
        ),
        hr: () => <hr className='my-6 border-gray-200' />
      }}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeFormat, rehypeRaw]}
    >
      {content?.replaceAll('–', '-').replaceAll('—', '-')}
    </ReactMarkdown>
  );
};

export default ErrorContent;
