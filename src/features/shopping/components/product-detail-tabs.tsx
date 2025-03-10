import { useState } from 'react';

interface ProductType {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
}

interface Product {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  isDeleted: boolean;
  productTypes: ProductType[];
}

interface ProductTabsProps {
  product: Product;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div>
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={`py-4 font-medium ${
              activeTab === 'description'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`py-4 font-medium ${
              activeTab === 'additional'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('additional')}
          >
            Additional Information
          </button>
          <button
            className={`py-4 font-medium ${
              activeTab === 'reviews'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews (1)
          </button>
        </div>
      </div>

      <div className="py-6">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consec do eiusmod tincididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniaLo ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla paExcepteur sint occaecat cupidatat non proident, sunt in
              culpa qui oLcia deserunt mollit anim id est laborum. iatis unde
              omnis iste natus error sit voluptatem accusantium
            </p>
            <p>
              Lorem ipsum dolor sit amet, consec do eiusmod tincididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniaLo ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco.
            </p>

            <div className="mt-6">
              <h3 className="mb-2 font-bold">Characteristics :</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Rsit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  inc.
                </li>
                <li>
                  sunt in culpa qui oLcia deserunt mollit anim id est laborum.
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consec do eiusmod tincididu.
                </li>
              </ul>
            </div>

            <div className="mt-6 border-l-4 border-gray-300 bg-gray-50 p-4">
              <p>
                On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the charms.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'additional' && (
          <div>
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <th className="py-2 pr-4 text-left font-medium">Weight</th>
                  <td className="py-2">2 kg</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 text-left font-medium">
                    Dimensions
                  </th>
                  <td className="py-2">60 × 40 × 60 cm</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 text-left font-medium">Materials</th>
                  <td className="py-2">Wood, Metal</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 text-left font-medium">Colors</th>
                  <td className="py-2">Gold, Brown</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="mb-6 border-b pb-6">
              <div className="flex items-start space-x-4">
                <div className="size-12 shrink-0 rounded-full bg-gray-200"></div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-bold">John Doe</h4>
                    <span className="ml-2 text-sm text-gray-500">
                      - March 3, 2025
                    </span>
                  </div>
                  <div className="my-1 flex text-yellow-400">{'★★★★☆'}</div>
                  <p>
                    Great chair! Very comfortable and looks exactly as pictured.
                    The quality is excellent and it was easy to assemble.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">Add a Review</h3>
              <form className="space-y-4">
                <div>
                  <label className="mb-1 block font-medium">Your Rating</label>
                  <div className="flex text-2xl text-gray-400">{'☆☆☆☆☆'}</div>
                </div>
                <div>
                  <label className="mb-1 block font-medium">Your Review</label>
                  <textarea
                    className="h-32 w-full border border-gray-300 p-2"
                    placeholder="Write your review here..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-medium">Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 p-2"
                    />
                  </div>
                </div>
                <button className="bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
