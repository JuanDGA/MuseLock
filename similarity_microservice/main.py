import asyncio

async def handle_client(reader, writer):
    """
    Handle incoming client connections asynchronously.
    """
    addr = writer.get_extra_info('peername')
    print(f"Connection established with {addr}")

    try:
        while True:
            # Read data sent by the client
            data = await reader.read(1024)
            if not data:
                break  # Connection closed

            message = data.decode().strip()
            print(f"Received: {message} from {addr}")

            # Send response back to the client
            response = f"Echo: {message}"
            writer.write(response.encode())
            await writer.drain()
            print(f"Sent: {response} to {addr}")

    except Exception as e:
        print(f"Error with {addr}: {e}")
    finally:
        print(f"Closing connection with {addr}")
        writer.close()
        await writer.wait_closed()

async def main():
    """
    Main coroutine to start the TCP server.
    """
    server = await asyncio.start_server(handle_client, '0.0.0.0', 9000)
    addr = server.sockets[0].getsockname()
    print(f"Server started on {addr}")

    async with server:
        await server.serve_forever()

# Run the asyncio event loop
if __name__ == '__main__':
    asyncio.run(main())
