export default function Page({ params }: { params: { slug: string[] } }) {
  let url = params.slug;
  const groupId = url.shift();
  const path = url.join('/');

  return <div>Sup</div>;
}
